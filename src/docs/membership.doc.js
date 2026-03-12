"use strict";
/**
 * @swagger
 * tags:
 *   - name: MEMBERSHIPS
 *     description: CRUD operations for memberships.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     IMembershipListResponse:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: integer
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IMembership'
 *         totalPages:
 *           type: integer
 *         currentPage:
 *           type: integer
 *     IMembership:
 *       type: object
 *       properties:
 *         membershipId:
 *           type: integer
 *         membershipUserId:
 *           type: integer
 *         membershipCode:
 *           type: string
 *         membershipPoint:
 *           type: integer
 *         membershipCategory:
 *           type: string
 *           enum: [gold, silver, platinum]
 */
/**
 * @swagger
 * /api/v1/memberships:
 *   get:
 *     summary: List memberships (paginated)
 *     tags: [MEMBERSHIPS]
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
 *         description: Paginated list of memberships
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
 *                   $ref: '#/components/schemas/IMembershipListResponse'
 */
/**
 * @swagger
 * /api/v1/memberships/{membershipCode}:
 *   get:
 *     summary: Find membership by code
 *     tags: [MEMBERSHIPS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: membershipCode
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Membership found
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
 *                   $ref: '#/components/schemas/IMembership'
 */
