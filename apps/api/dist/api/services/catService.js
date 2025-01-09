"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchesPlayed = exports.updateCatScore = exports.getCats = exports.createCats = void 0;
const supabase_1 = require("../config/supabase");
const errors_1 = require("../utils/errors");
const CAT_API_URL = 'https://data.latelier.co/cats.json';
async function createCats() {
    try {
        const catsImages = await fetchExternalCatsImages();
        const cats = catsImages.map((cat, index) => (Object.assign(Object.assign({}, cat), { catNumber: index + 1, score: 0 })));
        for (const cat of cats) {
            const { data: existingCat, error: fetchError } = await supabase_1.supabase
                .from('cats')
                .select('id')
                .eq('id', cat.id)
                .maybeSingle();
            if (fetchError) {
                throw new errors_1.DatabaseError(`Error checking cat existence: ${fetchError.message}`);
            }
            if (!existingCat) {
                const { error: insertError } = await supabase_1.supabase.from('cats').insert(cat);
                if (insertError) {
                    throw new errors_1.DatabaseError(`Error inserting cat: ${insertError.message}`);
                }
            }
        }
        return await getCats();
    }
    catch (error) {
        if (error instanceof errors_1.DatabaseError || error instanceof errors_1.ExternalApiError) {
            throw error;
        }
        throw new errors_1.ExternalApiError('Failed to fetch and store cats');
    }
}
exports.createCats = createCats;
async function getCats() {
    const { data, error } = await supabase_1.supabase
        .from('cats')
        .select('id, url, score, catNumber')
        .order('score', { ascending: false });
    if (error) {
        throw new errors_1.DatabaseError('Failed to fetch cats from database');
    }
    if (!data || data.length === 0) {
        throw new errors_1.NotFoundError('No cats found in the database');
    }
    return data;
}
exports.getCats = getCats;
async function updateCatScore(id) {
    if (!id) {
        throw new errors_1.BadRequestError('Invalid cat ID');
    }
    const { error } = await supabase_1.supabase.rpc('increment_score', { row_id: id });
    if (error) {
        throw new errors_1.DatabaseError(`Failed to update cat score: ${error.message}`);
    }
    const { data, error: fetchError } = await supabase_1.supabase
        .from('cats')
        .select('id, url, score, catNumber')
        .eq('id', id)
        .single();
    if (fetchError) {
        throw new errors_1.DatabaseError('Failed to fetch updated cat');
    }
    if (!data) {
        throw new errors_1.NotFoundError('Cat not found after update');
    }
    return data;
}
exports.updateCatScore = updateCatScore;
async function getMatchesPlayed() {
    const { data, error } = await supabase_1.supabase.from('cats').select('score');
    if (error) {
        throw new errors_1.DatabaseError('Failed to fetch matches played');
    }
    if (!data) {
        throw new errors_1.NotFoundError('No cat data found');
    }
    return data.reduce((sum, cat) => sum + (cat.score || 0), 0);
}
exports.getMatchesPlayed = getMatchesPlayed;
async function fetchExternalCatsImages() {
    try {
        const response = await fetch(CAT_API_URL);
        const data = await response.json();
        return data.images;
    }
    catch (error) {
        throw new errors_1.ExternalApiError('Failed to fetch cats from external API');
    }
}
