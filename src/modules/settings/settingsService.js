import authAxios from 'modules/shared/axios/authAxios';
import AuthService from 'modules/auth/authService';

export default class SettingsService {
  static async initialFetch() {
    try {
      return await this.find();
    } catch (error) {
      AuthService.signout();
      throw error;
    }
  }

  static async find() {
    const response = await authAxios.get(`/settings`);
    return response.data;
  }

  static async save(settings) {
    const body = {
      settings,
    };

    const response = await authAxios.put(`/settings`, body);
    return response.data;
  }
}
