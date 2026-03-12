"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IPointConvertion:
 *       type: object
 *       properties:
 *         pointConvertionId:
 *           type: integer
 *           example: 1
 *         pointConvertionPoint:
 *           type: integer
 *           example: 100
 *         pointConvertionPointInIdr:
 *           type: number
 *           format: decimal
 *           example: 10000
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
 *     IPointConvertionUpsertRequest:
 *       type: object
 *       required:
 *         - pointConvertionPointInIdr
 *       properties:
 *         pointConvertionPointInIdr:
 *           type: number
 *           format: decimal
 *           minimum: 1
 *           description: IDR value for the base point unit
 *           example: 100
 */
/**
 * @swagger
 * tags:
 *   - name: POINT CONVERTIONS
 *     description: Configuration for point to currency conversion.
 */
/**
 * @swagger
 * /api/v1/points/convertions:
 *   get:
 *     summary: Get current point convertion configuration
 *     tags: [POINT CONVERTIONS]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current point convertion configuration
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
 *                   $ref: '#/components/schemas/IPointConvertion'
 *       404:
 *         description: Point convertion not found
 */
/**
 * @swagger
 * /api/v1/points/convertions:
 *   patch:
 *     summary: Create or update point convertion configuration
 *     tags: [POINT CONVERTIONS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IPointConvertionUpsertRequest'
 *     responses:
 *       200:
 *         description: Point convertion configuration saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
