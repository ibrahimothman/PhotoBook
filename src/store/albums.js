import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createAlbum as createAlbumMutation } from '../graphql/mutations';
import { createPhoto as createPhotoMutation } from '../graphql/mutations';
import { getAlbum as getAlbumQuery } from '../graphql/queries';
import { listAlbums as listAlbumsQuery } from '../graphql/queries';
import { uuid } from 'uuidv4';
import awsconfig from '../aws-exports';

const state = {
    albums: [],
};

const mutations = {
    setAlbums: (state, payload) => { state.albums = payload; }
}

const actions = {
    async createAlbum({ dispatch }, payload) {
        try {
            console.log(payload);
            await API.graphql(graphqlOperation(createAlbumMutation, { input: payload }))
            dispatch('getAlbums');
        //    / return Promise.resolve();
        } catch (error) {
            console.error(error);
            // return Promise.reject(error);

        }
    },

    async getAlbum(_, albumId) {
        try {
            const { data } = await API.graphql(graphqlOperation(getAlbumQuery, { id: albumId }))
            return Promise.resolve(data.getAlbum);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    async getAlbums({ commit }) {
        try {
            const { data } = await API.graphql(graphqlOperation(listAlbumsQuery))
            console.log(data.listAlbums.items);
            commit('setAlbums', data.listAlbums.items);
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    async createPhoto(_, { file, albumId }) {
        const {
            aws_user_files_s3_bucket_region: region,
            aws_user_files_s3_bucket: bucket
        } = awsconfig;
        const extension = file.name.slice(file.name.lastIndexOf('.') + 1);
        const photoId = uuid();
        const key = `images/${photoId}.${extension}`;
        const inputData = {
            id: photoId,
            photoAlbumId: albumId,
            fullsize: {
                key,
                region,
                bucket
            }
        }

        //s3 bucket storage add file to it
        try {
            await Storage.put(key, file, {
                level: "protected",
                metadata: { albumId, photoId }
            })
            await API.graphql(
                graphqlOperation(createPhotoMutation, { input: inputData })
            )
            return Promise.resolve();


        } catch (error) {
            console.log("createPhoto error", error)
            return Promise.reject(error);

        }
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations,
}