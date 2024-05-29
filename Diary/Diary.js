$(document).ready(function() {
    const correctPassword = 'Utsab@123';
  
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
      localStorage.setItem('userNotes', notes);
      alert('Notes saved successfully!');
    });
  
    function loadNotes() {
      const savedNotes = localStorage.getItem('userNotes');
      if (savedNotes) {
        $('#notes').val(savedNotes);
      }
    }
  });
  