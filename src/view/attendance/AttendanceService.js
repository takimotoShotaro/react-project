import authAxios from 'modules/shared/axios/authAxios';

export default class AttendanceService {

  static async create(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      `/record/attendance`,
      body,
    );

    return response.data;
  }

  static async undo(data) {
    const body = {
      data,
    };

    const response = await authAxios.post(
      `/record/undo`,
      body,
    );

    return response.data;
  }
}
