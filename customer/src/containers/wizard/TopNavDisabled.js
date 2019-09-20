import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";

class TopNavDisabled extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
    }
  }

  topNavClick(stepItem, push) {
    push(stepItem.id);
  }

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  }

  onClickPrev(goToPrev, steps, step) {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Card>
        <CardBody className="wizard wizard-default">
          <Wizard>
            <TopNavigation className="justify-content-center" disableNav={true} topNavClick={this.topNavClick} />
            <Steps>
              <Step id="step1" name={messages["wizard.step-name-1"]} desc={messages["wizard.step-desc-1"]}>
                <div className="wizard-basic-step">
                  <Form>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Name" />
                      </Label>
                      <Input type="text" name="name" placeholder='Name' value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    </FormGroup>
                  </Form>
                </div>
              </Step>
              <Step id="step4" hideTopNav={true}>
                <div className="wizard-basic-step text-center">
                  <h2 className="mb-2"><IntlMessages id="Tesekkurler" /></h2>
                  <p><IntlMessages id="Kaydiniz Tamammlandi" /></p>
                </div>
              </Step>
            </Steps>
            <BottomNavigation onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel='Geri' nextLabel='Devam' />
          </Wizard>
        </CardBody>
      </Card>
    );
  }
}
export default injectIntl(TopNavDisabled)
