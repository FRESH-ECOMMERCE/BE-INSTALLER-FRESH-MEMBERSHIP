"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IStatistic:
 *       type: object
 *       properties:
 *         totalUsers:
 *           type: integer
 *           example: 120
 *         totalStores:
 *           type: integer
 *           example: 10
 */
/**
 * @swagger
 * tags:
 *   - name: STATISTICS
 *     description: Aggregated statistics for the application.
 */
/**
 * @swagger
 * /api/v1/stats:
 *   get:
 *     summary: Get application statistics
 *     tags: [STATISTICS]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
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
 *                   $ref: '#/components/schemas/IStatistic'
 */
