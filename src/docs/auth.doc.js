"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IUserRegisterRequest:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           example: John Doe
 *         userWhatsappNumber:
 *           type: string
 *           example: 6281234567890
 *         userPassword:
 *           type: string
 *           example: qwerty
 *     IUserLoginRequest:
 *       type: object
 *       properties:
 *         userWhatsappNumber:
 *           type: string
 *           example: 6281234567890
 *         userPassword:
 *           type: string
 *           example: qwerty
 *     IAuthSuccessResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               example: jwt.token.here
 *             refreshToken:
 *               type: string
 *               example: jwt.token.here
 *     IRequestOtpRequest:
 *       type: object
 *       properties:
 *         userWhatsappNumber:
 *           type: string
 *           example: 6281234567890
 *         otpType:
 *           type: string
 *           example: register
 *     IVerifyOtpRequest:
 *       type: object
 *       properties:
 *         otpCode:
 *           type: string
 *           example: 123456
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
 *           description: Type of point transaction (earn or redeem)
 *           example: "earn"
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
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with userWhatsappNumber and userPassword
 *     description: |
 *       Validates credentials and returns success. The accessToken is returned in the response body.
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUserLoginRequest'
 *     responses:
 *       200:
 *         description: Login successful. Access token returned in the response body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAuthSuccessResponse'
 *       401:
 *         description: Invalid credentials
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a user and returns the access token in the response body.
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUserRegisterRequest'
 *     responses:
 *       201:
 *         description: User registered. Access token returned in the response body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAuthSuccessResponse'
 *       400:
 *         description: Invalid input or userWhatsappNumber already registered
 */
/**
 * @swagger
 * /api/v1/auth/update-password:
 *   patch:
 *     summary: Update password by userWhatsappNumber and userPassword
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userWhatsappNumber, userPassword]
 *             properties:
 *               userWhatsappNumber:
 *                 type: string
 *                 example: 6281234567890
 *               userPassword:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: User password updated successfully. Access token returned in the response body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAuthSuccessResponse'
 *       404:
 *         description: User not found.
 *       400:
 *         description: Invalid input.
 */
/**
 * @swagger
 * /api/v1/auth/request-otp:
 *   post:
 *     summary: Request OTP by userWhatsappNumber and otpType
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IRequestOtpRequest'
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAuthSuccessResponse'
 *       400:
 *         description: Invalid input.
 */
/**
 * @swagger
 * /api/v1/auth/verify-otp:
 *   post:
 *     summary: Verify OTP by otpCode
 *     tags: [AUTH]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IVerifyOtpRequest'
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IAuthSuccessResponse'
 *       400:
 *         description: Invalid input.
 */
