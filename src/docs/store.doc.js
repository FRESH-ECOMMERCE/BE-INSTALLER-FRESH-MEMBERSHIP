"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IStore:
 *       type: object
 *       properties:
 *         storeId:
 *           type: number
 *           example: 1
 *         storeName:
 *           type: string
 *           example: "My first store"
 *         storeLocation:
 *           type: string
 *           example: "My first store"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     IStoreCreateRequest:
 *       type: object
 *       required:
 *         - storeName
 *         - storeLocation
 *       properties:
 *         storeName:
 *           type: string
 *           maxLength: 255
 *           example: "New store"
 *         storeLocation:
 *           type: string
 *           maxLength: 255
 *           example: "My first store"
 *     IStoreUpdateRequest:
 *       type: object
 *       properties:
 *         storeName:
 *           type: string
 *           maxLength: 255
 *           example: "Updated store name"
 *         storeLocation:
 *           type: string
 *           maxLength: 255
 *           example: "Updated store location"
 *     IStoreListResponse:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: integer
 *           example: 25
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IStore'
 *         totalPages:
 *           type: integer
 *           example: 3
 *         currentPage:
 *           type: integer
 *           example: 1
 */
/**
 * @swagger
 * tags:
 *   - name: STORES
 *     description: CRUD operations for stores.
 */
/**
 * @swagger
 * /api/v1/stores:
 *   get:
 *     summary: List stores (paginated)
 *     tags: [STORES]
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
 *         description: Paginated list of stores
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
 *                   $ref: '#/components/schemas/IStoreListResponse'
 */
/**
 * @swagger
 * /api/v1/stores:
 *   post:
 *     summary: Create a new store
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IStoreCreateRequest'
 *     responses:
 *       201:
 *         description: Store created successfully
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
 *                   $ref: '#/components/schemas/IStore'
 */
/**
 * @swagger
 * /api/v1/stores/{storeId}:
 *   get:
 *     summary: Get a store by id
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Store detail
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
 *                   $ref: '#/components/schemas/IStore'
 *       404:
 *         description: Store not found
 */
/**
 * @swagger
 * /api/v1/stores/{storeId}:
 *   patch:
 *     summary: Update a store's name and location
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IStoreUpdateRequest'
 *     responses:
 *       200:
 *         description: Store updated successfully
 *       404:
 *         description: Store not found
 */
/**
 * @swagger
 * /api/v1/stores/{storeId}:
 *   delete:
 *     summary: Delete a store
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Store deleted successfully
 *       404:
 *         description: Store not found
 */
