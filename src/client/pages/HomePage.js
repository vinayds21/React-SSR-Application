/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import VehicleListView from './VehicleListView';
import { fetchArticles } from '../actions';

const HomePage = (props) => {
  const { fetchArticles: loadArticles } = props;
  // const [launchYear, setLaunchYear] = useState(0);
  // const [successfulLaunch, setSuccessfulLaunch] = useState('YES');

  const getMissionId = (missionIdArr) => {
    if (missionIdArr.length) {
      return missionIdArr.map((ids) => <span key={ids}>{ids}</span>);
    }
    return 'None';
  };

  // const getLaunchDate = (utcDateString) => {
  //   const launchDateUtc = new Date(utcDateString);
  //   return launchDateUtc.toString();
  // };
  const getTruncatedValue = (vehicleName) => {
    const valueLength = vehicleName.length;
    if (valueLength > 10) {
      const myTruncatedString = vehicleName.substring(0, 13);
      return (
        <span>
          {myTruncatedString}
          ...
        </span>
      );
    }
    return vehicleName;
  };

  const getVehicleData = (article) => (
    <div key={article.flight_number} className="col s12 m6 l4 xl3">
      <div className="card">
        <div className="card-image">
          <LazyLoadImage alt={article.mission_name} src={article.links.mission_patch_small} />
        </div>
        <div className="card-content">
          <h6>{getTruncatedValue(article.mission_name)}</h6>
          <p>{`# ${article.flight_number}`}</p>
          <p>
            <b>Mission ID(s): &nbsp;</b>
            {getMissionId(article.mission_id)}
          </p>
          <p>
            <b>Launch Year: &nbsp;</b>
            {article.launch_year}
          </p>
          <p>
            <b>Succesfull Launch: &nbsp;</b>
            {article.launch_success ? 'YES' : 'NO'}
          </p>
        </div>
      </div>
    </div>
  );

  const renderArticles = () => {
    const { articles } = props;
    // console.log('launchYear', launchYear, successfulLaunch);
    if (articles.length) {
      return articles.map((article) => {
        return getVehicleData(article);
      });
    }
    return (
      <div>
        <h4>No Launch Data Found</h4>
      </div>
    );
  };

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>SpaceX Launch Programs</title>
      </Helmet>
    );
  };

  const getYearList = (yearList) => {
    return yearList.map((year) => {
      return (
        <div className="col s3 m2 l6 xl3" style={{ marginBottom: '10px' }} key={year}>
          <a
            className="waves-effect waves-light btn-small"
            onClick={() => {
              loadArticles({ year });
            }}
          >
            {year}
          </a>
        </div>
      );
    });
  };

  const renderFilters = () => {
    const yearList = [
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
    ];
    return (
      <div className="card">
        <div className="card-content">
          <h5>Filters</h5>
          <h6>Year of Launch</h6>
          <div className="row">{getYearList(yearList)}</div>
          <h6>Successful Launch</h6>
          <div className="row">
            <div className="col s3 m2 l6 xl2" style={{ marginBottom: '10px' }}>
              <a 
                className="waves-effect waves-light btn-small"
                onClick={() => {
                loadArticles({ launch_success: 'YES' });
              }}>
                Yes
              </a>
            </div>
            <div className="col s3 m2 l6 xl2" style={{ marginBottom: '10px' }}>
            <a 
              className="waves-effect waves-light btn-small"
              onClick={() => {
              loadArticles({ launch_success: 'NO' });
            }}>
                No
            </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadArticles();
  }, [loadArticles]);
  return (
    <div>
      {head()}
      <div className="row">
        <div className="col s12 m12 l3 xl3">{renderFilters()}</div>
        <div className="col s12 m12 l9 xl9">
          <div className="row">{renderArticles()}</div>
          {/* <VehicleListView
            launchYear={launchYear}
            successfulLaunch={successfulLaunch}
            vehicleList={articles}
          /> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchArticles()); // Manually dispatch a network request
};

HomePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  fetchArticles: PropTypes.func,
};

HomePage.defaultProps = {
  articles: [],
  fetchArticles: null,
};

export default {
  component: connect(mapStateToProps, { fetchArticles })(HomePage),
  loadData,
};
