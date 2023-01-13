import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestsNew extends Component {
  state = {
    descripton: "",
    recipient: "",
    value: "",
    errorMessage: "",
    isCreatingRequest: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return {
      address,
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ errorMessage: "", isCreatingRequest: true });

    try {
      const campaign = Campaign(this.props.address);

      const { description, recipient, value } = this.state;

      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });

      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    } finally {
      this.setState({ isCreatingRequest: false });
    }
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>

        <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient address</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops" content={this.state.errorMessage} />
          <Button loading={this.state.isCreatingRequest} primary>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestsNew;
