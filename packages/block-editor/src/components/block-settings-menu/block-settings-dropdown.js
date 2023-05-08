/**
 * WordPress dependencies
 */
import { serialize } from '@wordpress/blocks';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { moreVertical } from '@wordpress/icons';
import { Children, cloneElement, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { pipe, useCopyToClipboard } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import BlockActions from '../block-actions';
import BlockModeToggle from './block-mode-toggle';
import BlockHTMLConvertButton from './block-html-convert-button';
import __unstableBlockSettingsMenuFirstItem from './block-settings-menu-first-item';
import BlockSettingsMenuControls from '../block-settings-menu-controls';
import { store as blockEditorStore } from '../../store';

const noop = () => {};
const POPOVER_PROPS = {
	className: 'block-editor-block-settings-menu__popover',
	position: 'bottom right',
	variant: 'toolbar',
};

function CopyMenuItem( { blocks, onCopy, label } ) {
	const ref = useCopyToClipboard( () => serialize( blocks ), onCopy );
	const copyMenuItemBlocksLabel =
		blocks.length > 1 ? __( 'Copy blocks' ) : __( 'Copy block' );
	const copyMenuItemLabel = label ? label : copyMenuItemBlocksLabel;
	return <MenuItem ref={ ref }>{ copyMenuItemLabel }</MenuItem>;
}

export function BlockSettingsDropdown( {
	clientIds,
	__experimentalSelectBlock,
	children,
	__unstableDisplayLocation,
	...props
} ) {
	const blockClientIds = Array.isArray( clientIds )
		? clientIds
		: [ clientIds ];
	const count = blockClientIds.length;
	const firstBlockClientId = blockClientIds[ 0 ];
	const {
		firstParentClientId,
		onlyBlock,
		previousBlockClientId,
		nextBlockClientId,
		selectedBlockClientIds,
	} = useSelect(
		( select ) => {
			const {
				getBlockCount,
				getBlockRootClientId,
				getPreviousBlockClientId,
				getNextBlockClientId,
				getSelectedBlockClientIds,
			} = select( blockEditorStore );

			const _firstParentClientId =
				getBlockRootClientId( firstBlockClientId );

			return {
				firstParentClientId: _firstParentClientId,
				onlyBlock: 1 === getBlockCount( _firstParentClientId ),
				previousBlockClientId:
					getPreviousBlockClientId( firstBlockClientId ),
				nextBlockClientId: getNextBlockClientId( firstBlockClientId ),
				selectedBlockClientIds: getSelectedBlockClientIds(),
			};
		},
		[ firstBlockClientId ]
	);

	const shortcuts = useSelect( ( select ) => {
		const { getShortcutRepresentation } = select( keyboardShortcutsStore );
		return {
			duplicate: getShortcutRepresentation(
				'core/block-editor/duplicate'
			),
			remove: getShortcutRepresentation( 'core/block-editor/remove' ),
			insertAfter: getShortcutRepresentation(
				'core/block-editor/insert-after'
			),
			insertBefore: getShortcutRepresentation(
				'core/block-editor/insert-before'
			),
		};
	}, [] );

	const updateSelectionAfterDuplicate = useCallback(
		__experimentalSelectBlock
			? async ( clientIdsPromise ) => {
					const ids = await clientIdsPromise;
					if ( ids && ids[ 0 ] ) {
						__experimentalSelectBlock( ids[ 0 ] );
					}
			  }
			: noop,
		[ __experimentalSelectBlock ]
	);

	const updateSelectionAfterRemove = useCallback(
		__experimentalSelectBlock
			? () => {
					const blockToSelect =
						previousBlockClientId ||
						nextBlockClientId ||
						firstParentClientId;

					if (
						blockToSelect &&
						// From the block options dropdown, it's possible to remove a block that is not selected,
						// in this case, it's not necessary to update the selection since the selected block wasn't removed.
						selectedBlockClientIds.includes( firstBlockClientId ) &&
						// Don't update selection when next/prev block also is in the selection ( and gets removed ),
						// In case someone selects all blocks and removes them at once.
						! selectedBlockClientIds.includes( blockToSelect )
					) {
						__experimentalSelectBlock( blockToSelect );
					}
			  }
			: noop,
		[
			__experimentalSelectBlock,
			previousBlockClientId,
			nextBlockClientId,
			firstParentClientId,
			selectedBlockClientIds,
		]
	);

	const removeBlockLabel =
		count === 1 ? __( 'Delete' ) : __( 'Delete blocks' );

	return (
		<BlockActions
			clientIds={ clientIds }
			__experimentalUpdateSelection={ ! __experimentalSelectBlock }
		>
			{ ( {
				canDuplicate,
				canInsertDefaultBlock,
				canMove,
				canRemove,
				onDuplicate,
				onInsertAfter,
				onInsertBefore,
				onRemove,
				onCopy,
				onPasteStyles,
				onMoveTo,
				blocks,
			} ) => (
				<DropdownMenu
					icon={ moreVertical }
					label={ __( 'Options' ) }
					className="block-editor-block-settings-menu"
					popoverProps={ POPOVER_PROPS }
					noIcons
					{ ...props }
				>
					{ ( { onClose } ) => (
						<>
							<MenuGroup>
								<__unstableBlockSettingsMenuFirstItem.Slot
									fillProps={ { onClose } }
								/>
								{ count === 1 && (
									<BlockHTMLConvertButton
										clientId={ firstBlockClientId }
									/>
								) }
								<CopyMenuItem
									blocks={ blocks }
									onCopy={ onCopy }
								/>
								{ canDuplicate && (
									<MenuItem
										onClick={ pipe(
											onClose,
											onDuplicate,
											updateSelectionAfterDuplicate
										) }
										shortcut={ shortcuts.duplicate }
									>
										{ __( 'Duplicate' ) }
									</MenuItem>
								) }
								{ canInsertDefaultBlock && (
									<>
										<MenuItem
											onClick={ pipe(
												onClose,
												onInsertBefore
											) }
											shortcut={ shortcuts.insertBefore }
										>
											{ __( 'Insert before' ) }
										</MenuItem>
										<MenuItem
											onClick={ pipe(
												onClose,
												onInsertAfter
											) }
											shortcut={ shortcuts.insertAfter }
										>
											{ __( 'Insert after' ) }
										</MenuItem>
									</>
								) }
								{ canMove && ! onlyBlock && (
									<MenuItem
										onClick={ pipe( onClose, onMoveTo ) }
									>
										{ __( 'Move to' ) }
									</MenuItem>
								) }
								{ count === 1 && (
									<BlockModeToggle
										clientId={ firstBlockClientId }
										onToggle={ onClose }
									/>
								) }
							</MenuGroup>
							<MenuGroup>
								<CopyMenuItem
									blocks={ blocks }
									onCopy={ onCopy }
									label={ __( 'Copy styles' ) }
								/>
								<MenuItem onClick={ onPasteStyles }>
									{ __( 'Paste styles' ) }
								</MenuItem>
							</MenuGroup>
							<BlockSettingsMenuControls.Slot
								fillProps={ { onClose } }
								clientIds={ clientIds }
								__unstableDisplayLocation={
									__unstableDisplayLocation
								}
							/>
							{ typeof children === 'function'
								? children( { onClose } )
								: Children.map( ( child ) =>
										cloneElement( child, { onClose } )
								  ) }
							{ canRemove && (
								<MenuGroup>
									<MenuItem
										onClick={ pipe(
											onClose,
											onRemove,
											updateSelectionAfterRemove
										) }
										shortcut={ shortcuts.remove }
									>
										{ removeBlockLabel }
									</MenuItem>
								</MenuGroup>
							) }
						</>
					) }
				</DropdownMenu>
			) }
		</BlockActions>
	);
}

export default BlockSettingsDropdown;
