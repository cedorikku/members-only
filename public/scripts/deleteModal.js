const posts = document.getElementById('posts');
const dialog = document.getElementById('dialogDeletePost');
const dialogContent = document.getElementById('dialogContent');

posts.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const btn = e.target;
        populateDialogContent(btn.dataset.postId);
        dialog?.showModal();
    }
});

function populateDialogContent(id) {
    dialogContent?.replaceChildren();

    const deleteForm = document.createElement('form');
    const message = document.createElement('p');
    const deleteBtn = document.createElement('button');
    const closeBtn = document.createElement('button');

    deleteForm.method = 'POST';
    deleteForm.action = `/post/delete/${id}`;

    message.textContent = `Are you sure you want to delete this post? (id: ${id})`;

    deleteBtn.className = 'btn-delete';
    deleteBtn.type = 'submit';
    deleteBtn.textContent = 'Yes';

    closeBtn.type = 'button';
    closeBtn.textContent = 'No';
    closeBtn.addEventListener('click', () => {
        dialog?.close();
    });

    deleteForm.appendChild(message);
    deleteForm.appendChild(deleteBtn);
    deleteForm.appendChild(closeBtn);

    dialogContent?.appendChild(deleteForm);
}
