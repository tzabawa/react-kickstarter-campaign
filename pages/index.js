import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => ({
      description: <a>View Campaign</a>,
      fluid: true,
      header: address,
    }));

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        {/* <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        /> */}
        <h3>Open Campaigns</h3>

        <Button
          content="Create Campaign"
          floated="right"
          icon="add circle"
          primary
        />

        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
