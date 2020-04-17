import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Grid from "@material-ui/core/Grid";
import Typography from "./modules/components/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Check from '@material-ui/icons/Check';

export default function HomePage() {
  return (
    <div style={{overflowX: 'hidden'}}>
      <Header/>
      <Body/>
      <Contents/>
      <Footer/>
    </div>
  );
}

function Contents() {
  return (
    <>
      <div style={{padding: '160px 0', width: '100%', backgroundImage: `url(/images/lp/back3.png)`, backgroundPosition: 'center'}}>
        <div style={{maxWidth: 1280, borderRadius: 32, backgroundColor: 'rgb(255, 255, 255, 0.8)', margin: 'auto'}}>
          <Grid container spacing={8}>
            <Grid item lg={6} md={6} sm={6} xs={12} style={{alignSelf: 'center'}}>
              <List style={{maxWidth: 500, margin: 'auto'}}>
                <ListItem divider>
                  <Typography align="center" variant="h4">アルバイトの勤怠を記録する</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check/></ListItemIcon>
                  <ListItemText primary="カンタン記録"/>
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check/></ListItemIcon>
                  <ListItemText primary="自動集計"/>
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check/></ListItemIcon>
                  <ListItemText primary="ペーパーレス"/>
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check/></ListItemIcon>
                  <ListItemText primary="給料自動計算"/>
                </ListItem>
              </List>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <img style={{width: '100%'}} src={'/images/lp/lp_record.png'} alt={''}/>
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{padding: '160px 0', width: '100%', backgroundImage: `url(/images/lp/back2.png)`, backgroundPosition: 'bottom'}}>
        <div style={{maxWidth: 1280, borderRadius: 32, backgroundColor: 'rgb(255, 255, 255, 0.8)', margin: 'auto'}}>
          <Grid container spacing={8}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <img style={{width: '100%'}} src={'/images/lp/lp_staff.png'} alt={''}/>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12} style={{alignSelf: 'center'}}>
              <List style={{maxWidth: 500, margin: 'auto'}}>
                <ListItem divider>
                  <Typography align="center" variant="h4">アルバイトの情報を管理する</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check/></ListItemIcon>
                  <ListItemText primary="クラウド管理"/>
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check/></ListItemIcon>
                  <ListItemText primary="エクセル出力"/>
                </ListItem>
                <ListItem>
                  <ListItemIcon><Check/></ListItemIcon>
                  <ListItemText primary="アルバイト以外で塾生徒などの管理にも"/>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
