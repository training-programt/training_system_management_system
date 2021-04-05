import { Audit, Approval, ApprovalDetail, AuditDetail } from "@/pages";
export default [
  {
    path: '/auditApproval/audit',
    name: '审核',
    component: Audit,
  },
  {
    path: '/auditApproval/auditDetail',
    name: '审核详情',
    component: AuditDetail,
  },
  {
    path: '/auditApproval/auditEdit',
    name: '审核编辑',
    component: AuditDetail,
  },
  {
    path: '/auditApproval/approval',
    name: '审批',
    component: Approval,
  },

  {
    path: '/auditApproval/approvalDetail',
    name: '审批详情',
    component: ApprovalDetail,
  },
  {
    path: '/auditApproval/approvalEdit',
    name: '审批编辑',
    component: ApprovalDetail,
  },
]