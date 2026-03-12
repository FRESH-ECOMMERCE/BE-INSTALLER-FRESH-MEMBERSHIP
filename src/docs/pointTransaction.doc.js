"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IPointTransaction:
 *       type: object
 *       properties:
 *         pointTransactionId:
 *           type: integer
 *           example: 1
 *         pointTransactionUserId:
 *           type: integer
 *           example: 1
 *         pointTransactionMembershipCode:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           description: Membership Code to associate the point transaction with
 *           example: 1
 *         pointTransactionPoint:
 *           type: integer
 *           example: 100
 *         pointTransactionPointInIdr:
 *           type: number
 *           format: decimal
 *           example: 10000
 *           description: Points in IDR
 *         pointTransactionProductName:
 *           type: string
 *           example: "Product A"
 *         pointTransactionProductPrice:
 *           type: number
 *           format: decimal
 *           example: 50000
 *         pointTransactionStoreName:
 *           type: string
 *           example: "Store XYZ"
 *         pointTransactionType:
 *           type: string
 *           enum:
 *             - earn
 *             - redeem
 *           example: "earn"
 *           description: Type of point transaction (earn or redeem)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deleted:
 *           type: boolean
 *           example: false
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *     IPointTransactionCreateRequest:
 *       type: object
 *       required:
 *         - pointTransactionMembershipCode
 *         - pointTransactionPoint
 *         - pointTransactionType
 *       properties:
 *         pointTransactionMembershipCode:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           description: Membership Code to associate the point transaction with
 *           example: "MBR-001"
 *         pointTransactionPoint:
 *           type: integer
 *           minimum: 1
 *           description: Points to add (or subtract if negative not allowed per validation)
 *           example: 100
 *         pointTransactionProductName:
 *           type: string
 *           example: "Product A"
 *         pointTransactionProductPrice:
 *           type: integer
 *           minimum: 1
 *           example: 50000
 *         pointTransactionStoreName:
 *           type: string
 *           example: "Store XYZ"
 *         pointTransactionType:
 *           type: string
 *           enum:
 *             - earn
 *             - redeem
 *           description: Type of point transaction
 *           example: "earn"
 *           description: Type of point transaction (earn or redeem)
 *     IPointTransactionUpdateRequest:
 *       type: object
 *       properties:
 *         pointTransactionMembershipCode:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         pointTransactionPoint:
 *           type: integer
 *           minimum: 1
 *         pointTransactionProductName:
 *           type: string
 *         pointTransactionProductPrice:
 *           type: integer
 *           minimum: 1
 *         pointTransactionStoreName:
 *           type: string
 *         pointTransactionType:
 *           type: string
 *           enum:
 *             - earn
 *             - redeem
 *           example: "earn"
 *           description: Type of point transaction (earn or redeem)
 *     IPointTransactionListResponse:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: integer
 *           example: 25
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IPointTransaction'
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
 *   - name: POINT TRANSACTIONS
 *     description: CRUD operations for membership point logs.
 */
/**
 * @swagger
 * /api/v1/points/transactions:
 *   get:
 *     summary: List point transactions (paginated)
 *     tags: [POINT TRANSACTIONS]
 *     security:
 *       - BearerAuth: []
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
 *         description: Paginated list of point transactions
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
 *                   $ref: '#/components/schemas/IPointTransactionListResponse'
 */
/**
 * @swagger
 * /api/v1/points/transactions:
 *   post:
 *     summary: Create a point transaction (add points to membership)
 *     tags: [POINT TRANSACTIONS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IPointTransactionCreateRequest'
 *     responses:
 *       201:
 *         description: Point transaction created and membership points updated
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
 *                   $ref: '#/components/schemas/IPointTransaction'
 *       404:
 *         description: Membership not found for the given pointTransactionMembershipCode
 */
