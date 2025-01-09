import { Request, Response, NextFunction } from 'express'
import * as catService from '../services/catService'
import { NotFoundError, BadRequestError } from '../utils/errors'

export async function getCats(req: Request, res: Response, next: NextFunction) {
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

export async function updateCatScore(req: Request, res: Response, next: NextFunction) {
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

export async function getMatchesPlayed(req: Request, res: Response, next: NextFunction) {
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
