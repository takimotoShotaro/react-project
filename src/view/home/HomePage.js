import React, {PureComponent} from 'react';
import {i18n} from 'i18n';
import ContentWrapper from "../layout/styles/ContentWrapper";
import PageTitle from "../shared/styles/PageTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HistoryIcon from '@material-ui/icons/History';
import People from "@material-ui/icons/People";
import EventNote from "@material-ui/icons/EventNote";
import Edit from "@material-ui/icons/Edit";
import Info from "@material-ui/icons/Info";
import Link from "react-router-dom/Link";
import {connect} from "react-redux";
import authSelectors from "../../modules/auth/authSelectors";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ContentTitle from "../shared/styles/ContentTitle";
import ContentWrapperInvisible from "../layout/styles/ContentWrapperInvisible";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

class HomePage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      openTestUserDialog: false,
    }
  }

  componentDidMount() {
    const isTestUser = this.props.userText === 'TestUser.Timestamp';
    this.setState({openTestUserDialog: isTestUser});
  }

  render() {

    const {openTestUserDialog} = this.state;
    const menus = [
      {
        linkTo: "/attendance",
        icon: <Edit style={{fontSize: 48}} color={"primary"}/>,
        title: i18n('attendance.menu') + "　",
        describe: i18n('attendance.description'),
      },
      {
        linkTo: "/shift",
        icon: <EventNote style={{fontSize: 48}} color={"primary"}/>,
        title: "シフト　",
        describe: "従業員のシフトを作成します",
      },
      {
        linkTo: "/staff",
        icon: <People style={{fontSize: 48}} color={"primary"}/>,
        title: i18n('entities.staff.menu') + "　",
        describe: i18n('entities.staff.description'),
      },
      {
        linkTo: "/record",
        icon: <HistoryIcon style={{fontSize: 48}} color={"primary"}/>,
        title: i18n('entities.record.menu') + "　",
        describe: i18n('entities.record.description'),
      },
    ];

    return (
      <div style={{maxWidth: 1160}}>
        <ContentTitle title={'お知らせ'}/>
        <ContentWrapper>
          <List>
            <ListItem>
              <ListItemIcon><Info/></ListItemIcon>
              <ListItemText primary={'新着お知らせはありません'}/>
            </ListItem>
          </List>
        </ContentWrapper>

        <ContentTitle title={'ダッシュボード'} marginTop={true}/>
        <ContentWrapperInvisible>
          <Grid container spacing={2}>
            {menus.map(menu =>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Card>
                  <Link style={{textDecoration: 'none', color: 'inherit',}} to={menu.linkTo}>
                    <CardActionArea>
                      <CardContent>
                        <Grid container direction={"row"} alignItems={"center"} alignContent={"center"}
                              justify={"center"}>
                          <Grid item>
                            <ListItem>
                              <ListItemIcon>
                                {menu.icon}
                              </ListItemIcon>
                              <ListItemText>
                                <Typography style={{fontSize: 32}} color={"primary"}>{menu.title}</Typography>
                              </ListItemText>
                            </ListItem>
                          </Grid>
                          <Grid item style={{paddingBottom: 8}}>
                            <Typography color={"textSecondary"}>{menu.describe}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            )}
          </Grid>
        </ContentWrapperInvisible>

        <Dialog open={openTestUserDialog} onClose={() => this.setState({openTestUserDialog: false})}>
          <DialogContent>
            <Typography color={"error"}>
              テストユーザでログインしています。自由にご利用いただけますが他の方も利用しますので個人情報の登録などにお気をつけください。<br/>
              サインアウトされる場合は画面右上のボタンからどうぞ。
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant={"contained"} color={"primary"}
                    onClick={() => this.setState({openTestUserDialog: false})}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function select(state) {
  return {
    userText: authSelectors.selectCurrentUserNameOrEmailPrefix(
      state,
    ),
  };
}

export default connect(select)(HomePage);