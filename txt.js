jest.mock('react-redux',  () =>  ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

  // 模拟 action 函数
  const fetchDataMock = jest.spyOn(actions, 'fetchUserInfo').mockImplementation(() => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_USERINFO' });
    };
  });

expect(fetchDataMock).toHaveBeenCalled();

