import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xDA51247Ae5d087aA0bd0ef61e9E77d0bB1Ca6Ae3"
);

export default instance;
