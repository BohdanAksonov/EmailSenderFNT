import { createStore } from "vuex";
import ReceiverModel from "@/models/ReceiverModel";

export default createStore({
  state: {
    templateContent: "",
    receivers: new Array<ReceiverModel>(),
    showTemplateContent: false,
    showReceivers: false
  },
  mutations: {
    setTemplateContent(state, fileContent: string) {
      state.templateContent = fileContent;
    },

    setReceivers(state, receivers: Array<ReceiverModel>) {
      state.receivers = receivers;
    },

    setShowTemplateContent(state, value: boolean) {
      state.showTemplateContent = value;
    },

    setShowReceivers(state, value: boolean) {
      state.showReceivers = value;
    },
  },

  actions: {
    addTemplate({ commit }, fileContent: string) {
      commit("setTemplateContent", fileContent);
    },

    addReceivers({ commit }, receivers: Array<ReceiverModel>) {
      commit("setReceivers", receivers);
    },

    updateShowTemplateContent({ commit }, value: boolean) {
      commit("setShowTemplateContent", value);
    },

    updateShowReceivers({ commit }, value: boolean) {
      commit("setShowReceivers", value);
    },
  },

  getters: {
    getTemplateContent(state): string {
      return state.templateContent;
    },

    getReceivers(state): Array<ReceiverModel> {
      return state.receivers;
    },

    getShowTemplateContent(state): boolean {
      return state.showTemplateContent;
    },

    getShowReceivers(state): boolean {
      return state.showReceivers;
    },
  },

  modules: {},

  strict: true,
});
