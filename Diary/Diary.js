$(document).ready(function() {
    const correctPassword = '123';
  
    $('#submitPassword').click(function() {
      const enteredPassword = $('#password').val();
      if (enteredPassword === correctPassword) {
        $('#login').addClass('d-none');
        $('#notepad').removeClass('d-none');
        loadNotes();
      } else {
        alert('Incorrect password. Please try again.');
      }
    });
  
    $('#saveNotes').click(function() {
      const notes = $('#notes').val();
      if (notes) {
        saveNoteToLocalStorage(notes);
        $('#notes').val('');
        loadNotes();
        alert('Notes saved successfully!');
      }
    });
  
    function saveNoteToLocalStorage(note) {
      let notesArray = JSON.parse(localStorage.getItem('userNotes')) || [];
      notesArray.push(note);
      localStorage.setItem('userNotes', JSON.stringify(notesArray));
    }
  
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
  
    function initializeSlider() {
      $('.notes-slider').not('.slick-initialized').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
      });
    }
  
    $(document).on('click', '.edit-note', function() {
      const index = $(this).data('index');
      const notesArray = JSON.parse(localStorage.getItem('userNotes')) || [];
      const note = notesArray[index];
      $('#notes').val(note);
      notesArray.splice(index, 1);
      localStorage.setItem('userNotes', JSON.stringify(notesArray));
      loadNotes();
    });
  
    $(document).on('click', '.delete-note', function() {
      const index = $(this).data('index');
      let notesArray = JSON.parse(localStorage.getItem('userNotes')) || [];
      notesArray.splice(index, 1);
      localStorage.setItem('userNotes', JSON.stringify(notesArray));
      loadNotes();
    });
  
    $(document).on('mouseenter', '.note-card', function() {
      const noteContent = $(this).find('.note-text').text();
      $('body').append(
        `<div class="popup-note">
          <span class="close-popup">&times;</span>
          <p>${noteContent}</p>
        </div>`
      );
      $('.popup-note').fadeIn();
    });
  
    $(document).on('mouseleave', '.note-card', function() {
      $('.popup-note').remove();
    });
  
    $(document).on('click', '.close-popup', function() {
      $('.popup-note').fadeOut(function() {
        $(this).remove();
      });
    });
  
    loadNotes();
  });
  