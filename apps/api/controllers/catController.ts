import { Request, Response, NextFunction } from 'express'
import * as catService from '../services/catService'

export async function createCats(req: Request, res: Response, next: NextFunction) {
  try {
    const cats = await catService.createCats()
    res.status(201).json(cats)
  } catch (error) {
    next(error)
  }
}

export async function getCats(req: Request, res: Response, next: NextFunction) {
  try {
    const cats = await catService.getCats()
    res.status(200).json(cats)
  } catch (error) {
    next(error)
  }
}

export async function updateCatScore(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const updatedCat = await catService.updateCatScore(id)
    res.status(200).json(updatedCat)
  } catch (error) {
    next(error)
  }
}

export async function getMatchesPlayed(req: Request, res: Response, next: NextFunction) {
  try {
    const matchesPlayed = await catService.getMatchesPlayed()
    res.status(200).json(matchesPlayed)
  } catch (error) {
    next(error)
  }
}
