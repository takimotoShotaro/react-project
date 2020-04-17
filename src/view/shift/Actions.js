import authAxios from 'modules/shared/axios/authAxios';

const shiftActions = {
  doFind: async (filter) => {
    const response = await authAxios.get(`/shift`, {params: filter,});
    return response.data;
  },
  doSave: async (data) => {
    const response = await authAxios.post(`/shift`, {data,});
    return response.data;
  },
};

export default shiftActions;