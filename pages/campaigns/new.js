import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    errorMessage: "",
    isCreatingCampaign: false,
    minimumContribution: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ errorMessage: "", isCreatingCampaign: true });

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });

      Router.pushRoute("/");
    } catch (error) {
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ isCreatingCampaign: false });
    }
  };

  render() {
    return (
      <Layout>
        <h3>Create Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops" content={this.state.errorMessage} />
          <Button loading={this.state.isCreatingCampaign} primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
