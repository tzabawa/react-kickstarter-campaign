import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";
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
      <div>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        <h3>Open Campaigns</h3>
        {this.renderCampaigns()}
        <Button content="Create Campaign" icon="add circle" primary />
      </div>
    );
  }
}

export default CampaignIndex;
