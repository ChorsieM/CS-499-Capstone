# cs465-fullstack
CS-465 Full Stack development with MEAN

README

Architecture:
In this full stack project, I worked with three different frontend approaches: Express HTML templates, traditional JavaScript, and a Single Page Application (SPA). Express HTML provided a server-rendered approach where pages were refreshed on each request. This style is simple and clean, but less dynamic. Traditional JavaScript enhanced those pages by manipulating the Document Object Model (DOM), allowing interactive features without needing a full page reload. The SPA, on the other hand, delivered the most modern experience by dynamically updating content in the browser through API calls instead of constantly requesting new HTML files. This approach results in a smoother, app-like user interface, faster navigation, and better user engagement.

On the backend, the project used a NoSQL MongoDB database. MongoDB is flexible and schema-less, which is helpful when working with evolving application requirements because the structure of data can change over time. It also stores information in JSON-like documents, which makes it a natural fit for JavaScript-based full stack development. This alignment reduces complexity and speeds up both development and debugging.

Functionality:
JSON (JavaScript Object Notation) looks similar to JavaScript, but it is different. JSON is only a data format—it does not include logic or functions the way JavaScript does. In this project, JSON served as the “bridge” between the frontend and backend. The backend returned JSON through API endpoints, and the frontend parsed that JSON to display dynamic content in the browser. Using JSON ensured that data moved smoothly and consistently between both sides of the stack.

During development, I refactored code in several places to improve functionality and efficiency. For example, I cleaned up repeated UI rendering logic and moved it into reusable JavaScript components, so I didn’t have to write the same code multiple times. Reusable UI components make maintenance easier, reduce bugs, and speed up development because changes are made in one place instead of across several files.

Testing:
Full stack testing required making requests to API endpoints using different HTTP methods such as GET, POST, PUT, and DELETE. Each method performs a different operation on the server, so I tested correctness, response codes, and returned data formats. When security layers like JWT authentication were added, testing became more complex because requests needed valid tokens before accessing protected routes. This helped me understand how endpoints, methods, and security all work together to protect data while still allowing the expected functionality. Proper endpoint testing ensures that the backend behaves correctly, avoids vulnerabilities, and maintains secure communication with the frontend.

Reflection:
This course helped me take a major step toward my professional goals by giving me hands-on full stack experience. I strengthened my skills in JavaScript, API creation, MongoDB, routing, authentication, and modern frontend development. I also gained confidence working on both sides of an application, which makes me a more marketable and well-rounded developer. Now I can speak about full stack workflows, design choices, testing, and deployment in a professional environment—something that will directly benefit me as I pursue software engineering roles.
