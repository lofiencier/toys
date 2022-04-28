import { Op, Path } from 'sharedb';


const OperationEventKeys = ['AddNumOp', 'ListInsertOp', 'ListDeleteOp', 'ListReplaceOp', 'ListMoveOp', 'ObjectInsertOp', 'ObjectDeleteOp', 'ObjectReplaceOp', 'StringInsertOp', 'StringDeleteOp', 'SubtypeOp'] as const;
type OperationType = typeof OperationEventKeys[number];

export type ClientEventType = 'update' | 'destory';
export type PathType = string | number;
