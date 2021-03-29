import { Button, Col, Icon, Row } from 'antd';
import styles from 'src/app/components/main/footer.less';
import React from 'react';
import { FormattedMessage } from 'react-intl';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Row type="flex">
        <Col span={8}>
          <div className={styles.title}>
            <FormattedMessage id={'footer.tweets.title'}/>
          </div>
          <div>
            <FormattedMessage id={'footer.tweets.description'}/>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.title}>
            <FormattedMessage id={'footer.help.title'}/>
          </div>
          <div>
            <FormattedMessage id={'footer.help.description'}/>
          </div>
          <Button type="primary" className="margin-top">
            <FormattedMessage id={'button'}/>
          </Button>
        </Col>
        <Col span={8}>
          <div className={styles.title}>
            <FormattedMessage id={'footer.about.title'}/>
          </div>
          <ul className={styles.about}>
            <li>
              <FormattedMessage id={'news'}/>
            </li>
            <li>
              <FormattedMessage id={'events'}/>
            </li>
          </ul>
          <ul className={styles.medium}>
            <li>
              <Icon type="facebook" theme="filled"/>
            </li>
            <li>
              <Icon type="twitter-square" theme="filled"/>
            </li>
            <li>
              <Icon type="youtube" theme="filled"/>
            </li>
            <li>
              <Icon type="instagram" theme="filled"/>
            </li>
          </ul>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
