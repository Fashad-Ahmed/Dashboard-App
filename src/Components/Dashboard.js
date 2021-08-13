import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WidgetText from "./widgetText";
import WidgetBar from "./widgetBar";
import WidgetDoughnut from "./widgetDoughnut";
import WidgetSocial from "./WidgetSocial";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./dashboard.css";

//excel import
const config = {
  apiKey: "AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI",
  spreadsheetId: "1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg"
};
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      dropdownOptions: [],
      selectedValue: null,
      organicSource: null,
      directSource: null,
      referralSource: null,
      pageViews: null,
      users: null,
      newUsers: null,
      socialSource: null,
      sessions: null,
      numofSessions: null,
      pageSessions: null,
      sessionTime: null,
      bounceRate: null,
      sourceArr: [],
      userArr: [],
      socialArr: [],
      statsArr: []
    };
  }
  getData = (arg) => {
    const arr = this.state.items;
    const arrlen = arr.length;

    let selectedValue = 0;
    let organicSource = 0;
    let directSource = 0;
    let referralSource = 0;
    let pageViews = 0;
    let users = 0;
    let newUsers = 0;
    let socialSource = 0;
    let sessions = 0;
    let numofSessions = 0;
    let pageSessions = 0;
    let sessionTime = 0;
    let bounceRate = 0;
    let sourceArr = [];
    let usersArr = [];
    let socialArr = [];
    let statsArr = [];

    for (let i = 0; i < arrlen; i++) {
      if (arg === arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        referralSource = arr[i].referral_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;
        socialSource = arr[i].social_source;
        sessions = arr[i].sessions;
        numofSessions = arr[i].num_of_Sessions;
        pageSessions = arr[i].page_Sessions;
        sessionTime = arr[i].session_time;
        bounceRate = arr[i].bounce_rate;
        sourceArr.push(
          {
            label: "Organic Source",
            value: arr[i].organic_source
          },
          {
            label: "Direct Source",
            value: arr[i].direct_source
          },
          {
            label: "Referral Source",
            value: arr[i].referral_source
          }
        );
        usersArr.push(
          {
            label: "Users",
            value: arr[i].users
          },
          {
            label: "New Users",
            value: arr[i].new_users
          }
        );
        socialArr.push(
          {
            label: "Social Source",
            value: arr[i].social_source
          },
          {
            label: "Page Views",
            value: arr[i].page_views
          }
        );
        statsArr.push(
          {
            label: "Number Of Sessions",
            value: arr[i].sessions
          },
          {
            label: "Pages Per Sessions",
            value: arr[i].page_views
          }
        );
      }
    }
    selectedValue = arg;

    this.setState({
      organicSource: organicSource,
      directSource: directSource,
      referralSource: referralSource,
      pageViews: pageViews,
      users: users,
      socialSource: socialSource,
      newUsers: newUsers,
      sessions: sessions,
      numofSessions: numofSessions,
      pageSessions: pageSessions,
      sessionTime: sessionTime,
      bounceRate: bounceRate,
      sourceArr: sourceArr,
      usersArr: usersArr,
      socialArr: socialArr,
      statsArr: statsArr
    });
  };

  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value }, () => {
      console.log(this.state.organicSource);
    });
  };

  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;
        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        // dropdown options
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018"
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row className="Topheader">
            <Col>
              DASHBOARD
              {/* <Col> */}
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container className="mainDashboard">
          <Row>
            <Col>
              <WidgetText
                title="Organic Source"
                value={this.state.organicSource}
              />
            </Col>
            <Col>
              <widgetText
                title="Direct Source"
                value={this.state.directSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Referral Source"
                value={this.state.referralSource}
              />
            </Col>
            <Col>
              <WidgetText title="Page Views" value={this.state.pageViews} />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText title="Users" value={this.state.users} />
            </Col>
            <Col>
              <WidgetText title="New Users" value={this.state.newUsers} />
            </Col>
            <Col>
              <WidgetBar
                title="Source Comparison"
                data={this.state.sourceArr}
              />
            </Col>
            <Col>
              <WidgetDoughnut
                title="Users Comparison"
                data={this.state.usersArr}
              />
            </Col>
            <Col>
              <WidgetSocial
                title="Social-Page Views Comparison"
                data={this.state.socialArr}
              />
            </Col>
            <Col>
              <WidgetBar
                title="Sessions-Pages Comparison"
                data={this.state.statsArr}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
