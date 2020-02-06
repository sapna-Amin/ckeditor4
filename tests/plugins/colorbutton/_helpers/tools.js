/* exported findInPanel, chooseColorFromDialog, asyncChooseColorFromDialog */

function findInPanel( selector, button ) {
	return button._.panel.getBlock( button._.id ).element.findOne( selector );
}

function chooseColorFromDialog( editor, button, color ) {
	button.click( editor );

	editor.once( 'dialogShow', function( evt ) {
		var dialog = evt.data;
		dialog.setValueOf( 'picker', 'selectedColor', color );
		dialog.getButton( 'ok' ).click();

		resume();
	} );

	openColorDialog( button );
}

function openColorDialog( button ) {
	button._.panel.getBlock( button._.id ).element.findOne( '.cke_colormore' ).$.click();
	wait();
}

function asyncChooseColorFromDialog( bot, color ) {
	return new CKEDITOR.tools.promise( function( resolve, reject ) {
		var editor = bot.editor,
			txtColorBtn = editor.ui.get( 'TextColor' );

		editor.once( 'dialogShow', function( evt ) {
			var dialog = evt.data;

			dialog.setValueOf( 'picker', 'selectedColor', color );
			dialog.getButton( 'ok' ).click();

			CKEDITOR.tools.setTimeout( function() {
				try {
					resolve( bot );
				} catch ( e ) {
					reject( e );
				}
			}, 0, this );
		} );

		txtColorBtn.click( editor );
		findInPanel( '.cke_colormore', txtColorBtn ).$.click();
	} );
}
