import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Wizard, Steps, Step } from 'react-albus';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import { stateValues, surveyValues, survey2Values } from "../../constants/defaultValues";
import { Link } from 'react-router-dom';
import { setAlert, clearAlerts } from "../../redux/alert/actions";
import { connect } from 'react-redux';

class LastStepEnd extends Component {
    state = {
        bottomNavHidden: false,
        topNavDisabled: false,
        name: '',
        email: '',
        password: '',
        passwordVerify: '',
        company: '',
        city: '',
        surveyQ1: '',
        surveyQ2: ''
    }

    handleChangeSurvey = surveyQ1 => {
        this.setState({ surveyQ1 });
    };

    handleChangeSurvey2 = surveyQ2 => {
        this.setState({ surveyQ2 });
    };

    handleChangeCity = city => {
        this.setState({ city });
    };

    topNavClick = (stepItem, push) => {
        if (this.state.topNavDisabled) {
            return;
        }
        push(stepItem.id);
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onClickNext = (goToNext, steps, step) => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { password, passwordVerify, name, email, company, city, surveyQ1, surveyQ2 } = this.state;
        if (steps.indexOf(step) === 0) {
            if (name === '' || email === '' || company === '' || city === '') {
                this.props.clearAlerts();
                this.props.setAlert('Lütfen tüm alanları doldurunuz', 'warning', 5000);
                return;
            }
            if (!re.test(email)) {
                this.props.clearAlerts();
                this.props.setAlert('Lütfen geçerli bir e-posta adresi giriniz', 'warning', 5000);
                return;
            }
            if (name.split(' ').length < 2) {
                this.props.clearAlerts();
                this.props.setAlert('Lütfen tam adınızı arada boşluk olacak şekilde ad ve soyad şeklinde giriniz', 'warning', 5000);
                return;
            }
        } else {
            if (password === '' || passwordVerify === '' || surveyQ1 === '' || surveyQ2 === '') {
                this.props.clearAlerts();
                this.props.setAlert('Lütfen tüm alanları doldurunuz', 'warning', 5000);
                return;
            }
            if (password !== passwordVerify) {
                this.setState({ password: '', passwordVerify: '' });
                this.props.clearAlerts();
                this.props.setAlert('Girdiğiniz şifreler uyuşmuyor', 'danger', 5000);
                return;
            }
            if (password.length < 6) {
                this.setState({ password: '', passwordVerify: '' });
                this.props.clearAlerts();
                this.props.setAlert('Şifreniz en az 6 karakter uzunluğunda olmalıdır', 'danger', 5000);
                return;
            }
        }
        step.isDone = true;
        if (steps.length - 2 <= steps.indexOf(step)) {
            this.setState({ bottomNavHidden: true, topNavDisabled: true });
            this.props.onSubmit(this.state);
        }
        if (steps.length - 1 <= steps.indexOf(step)) {
            return;
        }
        this.props.clearAlerts();
        goToNext();
    }

    onClickPrev = (goToPrev, steps, step) => {
        if (steps.indexOf(step) <= 0) {
            return;
        }
        goToPrev();
    }

    render() {
        return (
            <Card>
                <CardBody className="wizard wizard-default">
                    <Wizard>
                        <TopNavigation className="justify-content-center" disableNav={this.state.bottomNavHidden} topNavClick={this.topNavClick} />
                        <Steps>
                            <Step id="step1" name="1. Adım" desc="Dogru doldur">
                                <div className="wizard-basic-step">
                                    <Form>
                                        <FormGroup>
                                            <Label className="mt-2">
                                                <IntlMessages id="Tam İsim" />
                                            </Label>
                                            <Input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                                            <Label className="mt-2">
                                                <IntlMessages id="E-posta Adresi" />
                                            </Label>
                                            <Input type="email" name="email" value={this.state.email} onChange={this.onChange} />
                                            <Label className="mt-2">
                                                <IntlMessages id="Şirket Adı" />
                                            </Label>
                                            <Input type="text" name="company" value={this.state.company} onChange={this.onChange} />
                                            <Label className="mt-2">
                                                <IntlMessages id="Şehir" />
                                            </Label>
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                name="form-field-name"
                                                value={this.state.city}
                                                onChange={this.handleChangeCity}
                                                options={stateValues}
                                            />
                                            <Label className="mt-2 ml-3">
                                                <p style={{ fontSize: 14, color: '#111' }}>Aramıza yeni katılanlara Trambolin'in tüm ayrıcalıkları ilk ay ÜCRETSİZ! </p>
                                            </Label>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Step>
                            <Step id="step2" name="2. Adım" desc="Dogru doldur">
                                <FormGroup>
                                    <Label className="mt-2">
                                        <IntlMessages id="Şifre" />
                                    </Label>
                                    <Input type="password" name="password" value={this.state.password} onChange={this.onChange} />
                                    <Label className="mt-2">
                                        <IntlMessages id="Şifre Tekrar" />
                                    </Label>
                                    <Input type="password" name="passwordVerify" value={this.state.passwordVerify} onChange={this.onChange} />

                                    <Label className="mt-2">
                                        <IntlMessages id="Şirketiniz daha önce çalışan ödüllendirme sistemlerini..." />
                                    </Label>
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={this.state.surveyQ1}
                                        onChange={this.handleChangeSurvey}
                                        options={surveyValues}
                                    />
                                    <Label className="mt-2">
                                        <IntlMessages id="Trambolini nereden duydunuz?" />
                                    </Label>
                                    <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={this.state.surveyQ2}
                                        onChange={this.handleChangeSurvey2}
                                        options={survey2Values}
                                    />
                                    <Label className="mt-2 ml-3">
                                        <p style={{ fontSize: 14, color: '#111' }}>Üyeliğinizi tamamlayarak <a href="/#!">kullanım koşulları</a> ve <a href="/#!">gizlilik politikamızı</a> kabul etmiş olursunuz. </p>
                                    </Label>
                                </FormGroup>
                            </Step>
                            <Step id="step3" hideTopNav={true}>
                                <div className="wizard-basic-step text-center" style={{ transform: 'translate(-50%, 50%)', position: 'relative', top: '50%', left: '50%' }}>
                                    <h2 className="mb-2"><IntlMessages id="Üyelik başvurunuz tamamlandı!" /></h2>
                                    <p><IntlMessages id="Lütfen üyeliğinizi onaylamak için e-postanızı kontrol edin" /></p>
                                    <p style={{ fontSize: 14, color: '#111' }}>Giriş yapmak için <Link to="/user/login">tıklayın</Link>. </p>
                                </div>
                            </Step>
                        </Steps>
                        <BottomNavigation onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className={"justify-content-center " + (this.state.bottomNavHidden && "invisible")} prevLabel='Geri' nextLabel='Devam' />
                    </Wizard>
                </CardBody>
            </Card>

        );
    }
}
export default connect(null, { setAlert, clearAlerts })(LastStepEnd);
