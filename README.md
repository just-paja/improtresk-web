# Improtřesk Website

[![CircleCI](https://circleci.com/gh/just-paja/improtresk-web.svg?style=shield)](https://circleci.com/gh/just-paja/improtresk-web)
[![Code Climate](https://codeclimate.com/github/just-paja/improtresk-web/badges/gpa.svg)](https://codeclimate.com/github/just-paja/improtresk-web)
[![Test Coverage](https://codeclimate.com/github/just-paja/improtresk-web/badges/coverage.svg)](https://codeclimate.com/github/just-paja/improtresk-web/coverage)
[![Issue Count](https://codeclimate.com/github/just-paja/improtresk-web/badges/issue_count.svg)](https://codeclimate.com/github/just-paja/improtresk-web)
[![dependencies Status](https://david-dm.org/just-paja/improtresk-web/status.svg)](https://david-dm.org/just-paja/improtresk-web)
[![devDependencies Status](https://david-dm.org/just-paja/improtresk-web/dev-status.svg)](https://david-dm.org/just-paja/improtresk-web?type=dev)

This is frontend for website of first and biggest Czech improvisation festival based on React, Redux and Express. It allows festival participants to check out what is coming up in next year and reconcile what has been on the festival in previous years. Users - Participants choose from list of workshops they will attend on after signing up and pay full workshop price using various payment methods.

## Used technologies

* [React](https://facebook.github.io/react/) to be reactive (of course)
* [Redux](http://redux.js.org/) to manipulate the state
* [Redux Saga](https://github.com/yelouafi/redux-saga) to manage side effects
* [Express](http://expressjs.com/) for server rendering
* [React Bootstrap](https://react-bootstrap.github.io/) to have some looks
* [React Router](https://github.com/ReactTraining/react-router) to map URLs to application layout
* [Crossing](https://github.com/lincolnloop/crossing) for named routes
* [Webpack](https://github.com/webpack/webpack) to put it all together

## Live

Live version is running on [improtresk.cz](http://improtresk.cz). Btw sorry guys, so far there were no plans to make English version.

## Backend

Backend for this app is written in Pyhton / Django. You can see it in separate repository:
[improtresk-api](https://github.com/just-paja/improtresk-api).
