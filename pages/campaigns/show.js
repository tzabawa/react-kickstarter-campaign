import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      approversCount: summary[3],
      balance: summary[1],
      manager: summary[4],
      minimumContribution: summary[0],
      requestsCount: summary[2],
    };
  }

  renderCards() {
    const {
      approversCount,
      balance,
      manager,
      minimumContribution,
      requestsCount,
    } = this.props;

    const items = [
      {
        description:
          "The manager created this campaign and can create requests to withdraw money",
        header: manager,
        meta: "Address of Manager",
        style: {
          overflowWrap: "break-word",
        },
      },
      {
        description:
          "You must contribute at least this amount of wei to become a campaign approver",
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
      },
      {
        description:
          "A request tries to withdraw money from the contract. Request must be approved by approvers",
        header: requestsCount,
        meta: "Number of Requests",
      },
      {
        description:
          "Number of people who have already donated to this campaign",
        header: approversCount,
        meta: "Number of Approvers",
      },
      {
        description:
          "This balane is how much money this campaign has left to spend",
        header: web3.utils.fromWei(balance),
        meta: "Campaign balance (ether)",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Show Campaign</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default CampaignShow;
