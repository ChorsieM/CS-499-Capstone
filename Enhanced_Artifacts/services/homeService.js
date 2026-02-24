// ENHANCEMENT: Service layer added to separate business logic from routing.
// This keeps routes focused on handling requests/responses and improves maintainability.

function getHomeViewModel() {
    return {
      title: 'Travlr Getaways',
      subtitle: 'Plan your next adventure',
      message: 'Explore destinations, rooms, and travel options.'
    };
  }
  
  module.exports = { getHomeViewModel };
