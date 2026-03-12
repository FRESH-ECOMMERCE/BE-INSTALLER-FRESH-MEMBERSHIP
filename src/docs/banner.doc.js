"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IBanner:
 *       type: object
 *       properties:
 *         bannerId:
 *           type: number
 *           example: 1
 *         bannerImage:
 *           type: string
 *           example: "https://example.com/banner.jpg"
 *         bannerOrder:
 *           type: number
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     IBannerCreateRequest:
 *       type: object
 *       required:
 *         - bannerImage
 *         - bannerOrder
 *       properties:
 *         bannerImage:
 *           type: string
 *           maxLength: 255
 *           example: "https://example.com/banner.jpg"
 *         bannerOrder:
 *           type: number
 *           minimum: 1
 *           example: 1
 *     IBannerUpdateRequest:
 *       type: object
 *       properties:
 *         bannerImage:
 *           type: string
 *           url: true
 *           example: "https://example.com/banner.jpg"
 *         bannerOrder:
 *           type: number
 *           minimum: 1
 *           example: 1
 *     IBannerListResponse:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: integer
 *           example: 25
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IBanner'
 *         totalPages:
 *           type: integer
 *           example: 3
 *         currentPage:
 *           type: integer
 *           example: 1
 *     IBannerDetailResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/IBanner'
 */
/**
 * @swagger
 * tags:
 *   - name: BANNERS
 *     description: CRUD operations for banners.
 */
/**
 * @swagger
 * /api/v1/banners:
 *   get:
 *     summary: List banners (paginated)
 *     tags: [BANNERS]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated list of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/IBannerListResponse'
 */
/**
 * @swagger
 * /api/v1/banners:
 *   post:
 *     summary: Create a new banner
 *     tags: [BANNERS]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IBannerCreateRequest'
 *     responses:
 *       201:
 *         description: Banner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/IBanner'
 */
/**
 * @swagger
 * /api/v1/banners/{bannerId}:
 *   get:
 *     summary: Get a banner by id
 *     tags: [BANNERS]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Banner detail
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/IBanner'
 *       404:
 *         description: Banner not found
 */
/**
 * @swagger
 * /api/v1/banners/{bannerId}:
 *   patch:
 *     summary: Update a banner's image and order
 *     tags: [BANNERS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IBannerUpdateRequest'
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *       404:
 *         description: Banner not found
 */
/**
 * @swagger
 * /api/v1/banners/{bannerId}:
 *   delete:
 *     summary: Delete a banner
 *     tags: [BANNERS]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Banner deleted successfully
 *       404:
 *         description: Banner not found
 */
