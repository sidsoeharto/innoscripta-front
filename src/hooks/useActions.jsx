import moment from 'moment';
import { enqueueSnackbar } from 'notistack';

import axiosClient from '../config/axios';
import { useLoading } from '../context/LoadingProvider';

export const useActions = () => {
  const { setLoading } = useLoading();

  const fetchNews = async ({setSuccessResponse, setErrors, payload, handleLoading}) => {
    const { keyword, startDate, endDate, category, source } = payload;

    const newsUrl = `/fetch-news/${source.value}`;
    try {
      handleLoading(true);
      const { data } = await axiosClient.get(newsUrl, {
        params: {
          keyword: keyword.trim() === "" ? null : keyword,
          from: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
          to: endDate ? moment(startDate).format('YYYY-MM-DD') : null,
          category: category.value === "all" ? null : category.value
        },
      });
      setSuccessResponse(data);
      handleLoading(false);
    } catch (error) {
      setErrors(error)
      handleLoading(false);
      enqueueSnackbar('There is something wrong!', { variant: 'danger' });
    }
  };

  const getPreferences = async ({ setSuccessResponse, setErrors }) => {
    const url = 'api/user/preferences';
    try {
      setLoading(true);
      const { data } = await axiosClient.get(url);
      setSuccessResponse(data)
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
      enqueueSnackbar('There is something wrong!', { variant: 'danger' });
    }
  }

  const addToCollection = async ({ setErrors, payload }) => {
    const url = 'api/news/add';
    try {
      setLoading(true);
      await axiosClient.post(url, payload);
      setLoading(false);
      enqueueSnackbar('Successfully added to your collections!', { variant: 'success' });
    } catch (error) {
      setErrors(error);
      setLoading(false);
      enqueueSnackbar('There is something wrong!', { variant: 'danger' });
    }
  }

  const getUsers = ({ setErrors, setSuccessResponse }) => {
    setLoading(true);
    axiosClient
      .get("/api/user")
      .then(({ data }) => {
        setSuccessResponse(data);
        setLoading(false);
      })
      .catch((error) => {
        setErrors(error);
        setLoading(false);
        enqueueSnackbar('There is something wrong!', { variant: 'danger' });
      });
  };

  const updateUsers = async ({setErrors, setSuccessResponse, payload}) => {
    setLoading(true);
    axiosClient
      .put("/api/user/update", payload)
      .then(() => {
        setSuccessResponse();
        enqueueSnackbar("Success updating profile", { variant: 'success' })
      })
      .catch((error) => {
        setErrors(error);
        setLoading(false);
        enqueueSnackbar('There is something wrong!', { variant: 'danger' });
      })
  }

  const updatePreferences = ({setErrors, setSuccessResponse, payload}) => {
    setLoading(true);
    axiosClient
      .put("/api/user/preferences", payload)
      .then(() => {
        setSuccessResponse();
        enqueueSnackbar("Success updating preferences", { variant: 'success' })
      })
      .catch((error) => {
        setErrors(error);
        setLoading(false);
        enqueueSnackbar('There is something wrong!', { variant: 'danger' });
      })
  }

  const getCollections = ({setSuccessResponse, setErrors}) => {
    setLoading(true);
    axiosClient
      .get("/api/news")
      .then(({ data }) => {
        setLoading(false);
        setSuccessResponse(data);
      })
      .catch((error) => {
        setErrors(error);
        setLoading(false);
        enqueueSnackbar('There is something wrong!', { variant: 'danger' });
      });
  };

  const deleteCollection = ({setSuccessResponse, setErrors, id}) => {
    setLoading(true);
    axiosClient
      .delete("api/news/remove/" + id)
      .then(() => {
        setSuccessResponse();
        enqueueSnackbar("Success deleting collection!", { variant: 'success' })
      })
      .catch((error) => {
        setErrors(error);
        setLoading(false);
        enqueueSnackbar('There is something wrong!', { variant: 'danger' });
      })
  }

  return {
    addToCollection,
    deleteCollection,
    fetchNews,
    getCollections,
    getUsers,
    getPreferences,
    updatePreferences,
    updateUsers
  }
};