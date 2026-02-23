// ENHANCEMENT NOTES:
// Created a small service to keep the home route clean. Route now calls getHomeViewModel() instead of building view data inline.
//
/**
 * homeService.js
 *
 * Keeping this small on purpose: the goal is to move "page data" out of the route.
 * Routes should mainly handle requests/responses, while services handle the logic.
 */

function getHomeViewModel() {
  return {
    title: 'Express',
    subtitle: 'CS465 Full-Stack Project',
    message: 'Welcome! This page is rendered through Express + Handlebars.',
  };
}

module.exports = {
  getHomeViewModel,
};
