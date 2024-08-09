import { Router } from "express"
import { renderRoleUsersApiController, managerRoleUsersApiController } from "../../controllers/managerRoleControllers.js"

export const managerRoleApi = Router()


managerRoleApi.get('/api/users/premium', renderRoleUsersApiController)
managerRoleApi.post('/api/users/premium/:uid', managerRoleUsersApiController)