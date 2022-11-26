import web3 from "./web3";
import CampaignFactort from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactort.interface),
  "0x4e915128425261a738f03eD92Df36D71388e4781"
);

export default instance;
