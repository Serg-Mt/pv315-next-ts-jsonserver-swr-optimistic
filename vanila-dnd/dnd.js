'use strict';

const
  draggables = document.querySelectorAll('main [draggable]'),
  dropzones = document.querySelectorAll('.target');

// обязательный слушатель
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', event => {
    // event.dataTransfer.setData('text/plain', draggable.id);
    event.target.classList.add('dragging');
  });
});

// необязательный слушатель
draggables.forEach(draggable => {
  draggable.addEventListener('dragend', event => {
    event.target.classList.remove('dragging');
  });
});

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', event => {
    if (dropzone.querySelector('.dragging')) return; // проверяем чтоб не бросить туда где пока находится наш draggable
    event.preventDefault(); // надо вызывать обязательно - иначе скинуть сюда будет нельзя!
    dropzone.classList.add('active') // по уму это надо делать в dragenter, но тут необходим поскольку странный порядок прихода dragenter dragleave при перероде на потомка
  });
});

// необязательный слушатель
dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragleave', event => {
    dropzone.classList.remove('active');
  });
});

// обязательный слушатель
dropzones.forEach(dropzone => {
  dropzone.addEventListener('drop', event => {
    const 
      draggable = document.querySelector('.dragging'); 
      //  document.getElementById(event.dataTransfer.getData("text/plain"));
    if (draggable) {
      dropzone.append(draggable);
      dropzone.classList.remove('active');
    }
  });
});





