import axiosInstance from '@/api'
import type { PaginatedData, RequestQueryParams } from '@/types/api'
import type { User } from '@/types/user'

const usersService = {
  getAll(params?: RequestQueryParams) {
    return axiosInstance.get<PaginatedData<User>>('/admin/users', { params })
  },
}

export default usersService
