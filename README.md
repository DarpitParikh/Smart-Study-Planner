# Smart Study Planner

A simple web-based study planner to help students organize their study schedules, set goals, track tasks, and receive reminders. All data is stored locally in your browser.

## Features

- **Add Study Tasks:** Create tasks with title, date, time, and study goal.
- **View & Manage Tasks:** Mark tasks as done, delete tasks, and view all tasks in a list.
- **Visual Timeline:** See your tasks visually sorted by date and time.
- **Reminders:** Set reminders for tasks and receive browser notifications at the scheduled time.
- **Local Storage:** All tasks and progress are saved in your browser; no account required.
- **Test Notifications:** Use the test button to check if browser notifications are working.

## How to Use

1. **Clone or Download the Repository**
2. **Open with Live Server (Recommended for Notifications)**
   - Use the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.
   - Or run a local server:
     - Python: `python -m http.server`
     - Node.js: `npx serve .`
3. **Open `http://localhost:PORT` in your browser**
4. **Add tasks, set reminders, and manage your study plan!**

## Deployment

- Deploy to [GitHub Pages](https://pages.github.com/) for free HTTPS hosting.
- All features (including notifications) work on GitHub Pages.

## Browser Notifications

- Notifications require permission; you will be prompted when setting a reminder or testing notifications.
- The browser tab must remain open for reminders to work.
- Notifications may be affected by browser or OS settings (e.g., Focus Assist, Do Not Disturb).

## File Structure

- `index.html` — Main web page
- `style.css` — Stylesheet
- `script.js` — JavaScript logic

## License

MIT License

---

**Made for learning and productivity!**
