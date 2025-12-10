console.log('[ClarifyChoice] WelcomeSection组件加载');

export function WelcomeSection() {
  console.log('[ClarifyChoice] WelcomeSection组件渲染');

  const welcomeText = `我是【2025年刚完成高考的高中生】，想让AI帮我【生成高考志愿专业填报建议】，以便【让我通过你的分析能从推荐的专业中做出明智选择】。

对话流程：我和AI将依次经历4个模式，需明确输入指令才能进入下一模式。

1. RESEARCH模式：AI澄清我的诉求
   输入"ENTER INNOVATE MODE"进入下一模式，否则继续澄清诉求

2. INNOVATE模式：AI推荐若干内容组织方案
   输入"ENTER PLAN MODE"进入下一模式，否则继续讨论方案

3. PLAN模式：AI根据澄清的诉求和选定的方案制定内容生成计划
   输入"ENTER EXECUTE MODE"进入下一模式

4. EXECUTE模式：AI按计划生成内容
   输入"ENTER REVIEW MODE"进入REVIEW模式（AI对比EXECUTE和PLAN是否有偏差）

如果满意EXECUTE模式生成的内容，可跳过REVIEW模式。

使用方法：
复制下方【】内的内容，补充完整其中嵌套的【】内容后粘贴到提示词输入区，发送给AI开始对话。

【
参加高考所在城市：【参加高考所在城市】
三门选考科目：【三门选考科目】
高考分数：【高考分数】
擅长科目：【擅长科目】
兴趣爱好：【兴趣爱好】
期望的工作类型：【期望的工作类型】
】`;

  // 将【】标记替换为加粗样式
  const renderContent = () => {
    const parts = welcomeText.split(/【|】/);
    return parts.map((part, index) => {
      // 奇数索引的部分是【】之间的内容
      if (index % 2 === 1) {
        return (
          <strong key={index} className="font-bold text-black">
            【{part}】
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          ClarifyChoice - 高考志愿填报助手
        </h1>
        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
