$(document).ready(function() {
  const correctPassword = '123'; // Change this to your actual password

  // Toggle password visibility
  $('#togglePassword').on('click', function() {
    const passwordField = $('#password');
    const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
    passwordField.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });

  // Password submission and validation with loader
  $('#submitPassword').on('click', function() {
    const enteredPassword = $('#password').val();
    const container = $('.container');

    // Show loader and blur background
    $('#loader').show();
    container.addClass('blur');

    // Simulate loading time
    setTimeout(() => {
      if (enteredPassword === correctPassword) {
        $('#login').addClass('d-none');
        $('#notepad').removeClass('d-none');
        loadNotes();
      } else {
        alert('Incorrect password. Please try again.');
      }
      // Hide loader and remove blur effect
      $('#loader').hide();
      container.removeClass('blur');
    }, 2000); // Adjust the delay time as needed (2000ms = 2s)
  });

  // Save notes to local storage
  $('#saveNotes').click(function() {
    const notes = $('#notes').val();
    if (notes) {
      saveNoteToLocalStorage(notes);
      $('#notes').val('');
      loadNotes();
      alert('Notes saved successfully!');
    }
  });

  // Save note function
  function saveNoteToLocalStorage(note) {
    let notesArray = JSON.parse(localStorage.getItem('userNotes')) || [];
    notesArray.push(note);
    localStorage.setItem('userNotes', JSON.stringify(notesArray));
  }

  // Load notes function
  function loadNotes() {
    const notesArray = JSON.parse(localStorage.getItem('userNotes')) || [];
    $('.notes-slider').empty();
    notesArray.forEach((note, index) => {
      $('.notes-slider').append(
        `<div class="note-card" data-index="${index}">
          <div class="note-text">${note.substring(0, 100)}...</div>
          <div class="note-actions">
            <button class="btn btn-sm btn-primary edit-note" data-index="${index}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger delete-note" data-index="${index}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`
      );
    });
    initializeSlider();
  }

  // Initialize slider function
  function initializeSlider() {
    $('.notes-slider').not('.slick-initialized').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
    });
  }

  // Edit note function
  $(document).on('click', '.edit-note', function() {
    const index = $(this).data('index');
    const notesArray = JSON.parse(localStorage.getItem('userNotes')) || [];
    const note = notesArray[index];
    $('#notes').val(note);
    notesArray.splice(index, 1);
    localStorage.setItem('userNotes', JSON.stringify(notesArray));
    loadNotes();
  });

  // Delete note function
  $(document).on('click', '.delete-note', function() {
    const index = $(this).data('index');
    let notesArray = JSON.parse(localStorage.getItem('userNotes')) || [];
    notesArray.splice(index, 1);
    localStorage.setItem('userNotes', JSON.stringify(notesArray));
    loadNotes();
  });

  // Load existing notes on document ready
  loadNotes();
});
