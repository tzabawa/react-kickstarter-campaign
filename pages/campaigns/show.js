import React, { Component } from "react";
// import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
// import factory from "../../ethereum/factory";
// import web3 from "../../ethereum/web3";
// import { Router } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return summary;
  }

  render() {
    return (
      <Layout>
        <h3>Show Campaign</h3>
      </Layout>
    );
  }
}

export default CampaignShow;
