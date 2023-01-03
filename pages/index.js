import React, { Component } from "react";
import { Button, Card } from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => ({
      description: (
        <Link route={`/campaigns/${address}`}>
          <a className="item">View Campaign</a>
        </Link>
      ),
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

        <Link route="/campaigns/new">
          <a className="item">
            <Button
              content="Create Campaign"
              floated="right"
              icon="add circle"
              primary
            />
          </a>
        </Link>

        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
