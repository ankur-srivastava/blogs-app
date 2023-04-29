// add get, post, delete and update routes for blog

import express from 'express'
import {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlog,
} from '../controllers/blogController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/',  getBlogs)
router.get('/:id', getBlog)
router.post('/', protect, createBlog)
router.put('/:id', protect, updateBlog)
router.delete('/:id', protect, deleteBlog)

export default router
