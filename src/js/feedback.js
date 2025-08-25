/**
 * UX Feedback Script
 *
 * This script adds a material-style ripple effect to buttons for better
 * user interaction feedback. It applies to any element with the class
 * '.login-button', '.submit-btn', or '#voteButton'.
 */
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.login-button, .submit-btn, #voteButton');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Get click coordinates relative to the button
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            // Create a ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Append, then remove the ripple to create the effect
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600); // Duration of the ripple animation
        });
    });
});
