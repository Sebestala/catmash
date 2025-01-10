import { Request, Response, NextFunction } from 'express'
import * as catService from '../services/catService'
import { NotFoundError, BadRequestError } from '../utils/errors'

/**
 * getCats - Fetches and returns all cats.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} Sends a JSON response containing an array of cats or an error message.
 *
 * Features:
 * - Fetches cats from the `catService`.
 * - Handles `NotFoundError` with a 404 response.
 * - Passes other errors to the next middleware.
 */
export async function getCats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cats = await catService.getCats()
    res.status(200).json(cats)
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next(error)
    }
  }
}

/**
 * updateCatScore - Updates the score of a specific cat by its ID.
 *
 * @param {Request} req - The HTTP request object containing the cat ID in `req.params`.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} Sends a JSON response containing the updated cat or an error message.
 *
 * Features:
 * - Validates that a cat ID is provided, otherwise throws a `BadRequestError`.
 * - Updates the cat score using the `catService`.
 * - Handles `NotFoundError` with a 404 response and `BadRequestError` with a 400 response.
 * - Passes other errors to the next middleware.
 */
export async function updateCatScore(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params
    if (!id) {
      throw new BadRequestError('Cat ID is required')
    }
    const updatedCat = await catService.updateCatScore(id)
    res.status(200).json(updatedCat)
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message })
    } else if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message })
    } else {
      next(error)
    }
  }
}

/**
 * getMatchesPlayed - Fetches and returns the total number of matches played.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 *
 * @returns {Promise<void>} Sends a JSON response containing the number of matches played or an error message.
 *
 * Features:
 * - Fetches matches played data from the `catService`.
 * - Handles `NotFoundError` with a 404 response.
 * - Passes other errors to the next middleware.
 */
export async function getMatchesPlayed(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const matchesPlayed = await catService.getMatchesPlayed()
    res.status(200).json(matchesPlayed)
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message })
    } else {
      next(error)
    }
  }
}
