// Editorial questions adapted from the Kunshan query collection of 18 November 2026.
// Keys are the existing Chinese site slugs. Their English counterparts use the -en suffix.
const buyerQuestions = {
  'ks-xuanze': {
    review: {
      'zh-CN': {
        fact: '一个公差值需要同时对应型号、单位和测试条件。',
        rows: [
          ['图纸修订', '规格书版次和图号', '样稿引用同一版次'],
          ['参数表述', '原始公差与换算规则', '工程师复核单位和边界值']
        ]
      },
      en: {
        fact: 'A tolerance is meaningful only with its model, unit and test conditions.',
        rows: [
          ['Drawing revision', 'Sheet revision and drawing number', 'Draft cites the same revision'],
          ['Specification wording', 'Original tolerance and conversion rule', 'Engineer checks units and limits']
        ]
      }
    },
    records: { 'zh-CN': '把批准的规格书、服务商样稿和工程师批注放在一起。每处差异记下原值、拟发布值、测试条件和负责人，定稿时逐项签核。', en: 'Compare the approved sheet, agency draft and engineering comments side by side. Record the source value, proposed value, test conditions and owner for each discrepancy before approval.' },
    'zh-CN': [
      { question: '怎么判断 GEO 服务商能不能写准工厂的技术参数？', answer: '先拿一个在售型号做样稿。给服务商一页批准公开的规格书，要求稿件逐项注明型号、单位、公差、测试条件和资料版本，让负责该型号的工程师逐项核对。把需要返工的字段和原因记进审稿单，再决定是否扩大范围。' },
      { question: '工程师改了一个参数，哪些地方要一起更新？', answer: '从这条参数的来源页查起，列出引用它的产品页、下载手册、英文页和经销商页面。记录生效日期、适用批次和核准人。更新后用原采购问句复测，保存仍报旧值的回答及其来源链接。' }
    ],
    en: [
      { question: 'How can a factory check whether a GEO agency can describe its technical specifications accurately?', answer: 'Give the agency one approved spec sheet for a current model. Ask for a sample page that identifies the model, units, tolerances, test conditions and document revision. Have the responsible engineer check each field against the sheet and record any corrections before expanding the assignment.' },
      { question: 'Where should a revised specification be updated?', answer: 'Starting from the source sheet, list the product pages, downloads, translations and distributor listings that repeat the value. Record the effective date, applicable batches and approver. Repeat the original buyer question and save any answer that still gives the old value together with its cited source.' }
    ]
  },
  'sz-b2b': {
    review: {
      'zh-CN': {
        fact: '生产地址和销售地址承担不同业务，企业名称相同也要写明职能。',
        rows: [
          ['采购询价', '销售页的主体和联系电话', '询价能交到负责报价的团队'],
          ['看厂预约', '工厂页的参观地址和联系人', '导航终点与生产基地相符']
        ]
      },
      en: {
        fact: 'A sales address and factory address serve different purposes even when both belong to one legal entity.',
        rows: [
          ['Request a quote', 'Seller name and number on the sales page', 'Inquiry reaches the quoting team'],
          ['Book a visit', 'Visitor address and plant contact', 'Map destination matches the plant']
        ]
      }
    },
    records: { 'zh-CN': '为销售询价和工厂参观各走一次联系流程，核对官网、地图与名录里显示的主体和地点。把错配的页面和需要更正的字段交给各自维护人。', en: 'Trace a sales inquiry and a plant visit through the website, map and directory listings. Note the entity and location shown at each step, then assign each incorrect field to its page owner.' },
    'zh-CN': [
      { question: '昆山工厂和上海销售办公室应该怎样分别对外介绍？', answer: '在企业介绍里分别列出生产主体与销售主体的全称、职能、地址和联系人。若同属一个主体，就写明两个地点各自承担的业务，让采购人员知道看厂、询价分别联系谁。' },
      { question: '页脚同时写两个地址，如何检查模型有没有把工厂位置说错？', answer: '分别问“生产在哪里”和“上海哪里可以联系销售”，记录回答中的公司名、地点、职能和引用页。若引用页混写，在页脚补上“生产基地”和“销售办公室”标签，并核对地图商户和园区名录里的称呼。' }
    ],
    en: [
      { question: 'How should a Kunshan factory distinguish its Shanghai sales office from its production site?', answer: 'List the legal name, function, address and contact for each operation. If one company runs both, say which location handles plant visits and which handles sales inquiries. A buyer should be able to book either visit without guessing.' },
      { question: 'When both addresses appear in the footer, how can the company test for confusion?', answer: 'Ask separately where manufacturing takes place and how to reach sales in Shanghai. Save the company name, location, role and cited page in each answer. Label each address by function and check the corresponding map and industrial park listings if a cited page mixes them up.' }
    ]
  },
  'geo-budget': {
    review: {
      'zh-CN': {
        fact: '试点报价可以按相同周期、模型范围和复测工作量逐项核算。',
        rows: [
          ['一次性交付', '页面数量、稿件和编辑权限', '验收清单列明文件与归属'],
          ['持续费用', '复测频次和额外发布单价', '按同一周期计算含附加项总价']
        ]
      },
      en: {
        fact: 'Pilot prices can be compared using the same period, model coverage and retesting workload.',
        rows: [
          ['Initial delivery', 'Page count, drafts and editing rights', 'Acceptance list identifies files and ownership'],
          ['Recurring fees', 'Retest schedule and publication unit cost', 'Calculate the same-period total with extras']
        ]
      }
    },
    records: { 'zh-CN': '试点单上写明一条产品线、批准的产品页、每个模型的测试次数和验收日。把报价中的发布费用与复测费用分别对应到这张单上，确认额外复测如何计价。', en: 'On the pilot sheet, identify the product line, approved page, test count per model and acceptance date. Match publishing and monitoring charges to that sheet and confirm what additional runs cost.' },
    'zh-CN': [
      { question: '只试一条产品线，怎样比较昆山 GEO 服务商的试点报价？', answer: '让各家按同一范围列价。写下要验证的产品、采购问法、模型、复测次数、交付页面和源文件，再把一次性内容整理、持续监测及另计的发布费用分开。以这些交付物为单位比较同一周期的总价。' },
      { question: '一个季度询盘很少，还能依据什么决定是否追加预算？', answer: '保留试点前后的同一组问句，分别统计产品信息正确、品牌被提及、官网被引用的回答数及各自分母。另列有来源记录的有效询盘。样本很少时可先复测引用变化，续费前明确哪项观察值得再做一轮。' }
    ],
    en: [
      { question: 'How can a buyer compare GEO pilot quotes for a single product line?', answer: 'Ask each vendor to price the same product, buyer questions, models, retest schedule, published pages and editable files. Separate one-time content work, recurring monitoring and optional publication fees. Compare the totals for the same period and deliverables.' },
      { question: 'If few inquiries arrive in the quarter, what evidence can inform a renewal?', answer: 'Repeat the baseline questions and record the number and denominator of answers with accurate product facts, brand mentions and company-site citations. List qualified inquiries with known sources separately. When there are few observations, retest the citation pattern and agree on what another round would establish before renewing.' }
    ]
  },
  'qianwen-geo': {
    review: {
      'zh-CN': {
        fact: '质保期限与适用渠道、购买日期和订单条款有关。',
        rows: [
          ['历史订单', '购买日和当时适用的条款', '保留售后可核查的版本'],
          ['当前购买', '在售渠道和对应售后政策', '回答注明渠道并链接适用条款']
        ]
      },
      en: {
        fact: 'Warranty duration depends on sales channel, order date and applicable terms.',
        rows: [
          ['Previous order', 'Purchase date and terms at the time', 'Retain the version support staff can inspect'],
          ['Current purchase', 'Sales channel and current policy', 'Answer names the channel and links its terms']
        ]
      }
    },
    records: { 'zh-CN': '把官网订单、店铺订单各取一例，分别核对购买日期、型号、当时的承诺和现行售后页。政策确实因渠道而异时，保留能说明差异的原始条款。', en: 'Review one direct order and one marketplace order. Check the purchase date, model, terms at purchase and current support page. Retain the original terms where channels differ.' },
    'zh-CN': [
      { question: '官网改了质保期限，通义千问还引用旧客服帖怎么办？', answer: '先按产品、渠道和订单日期核实适用政策，在官网售后页列明现行期限、生效日、历史政策和查询入口。在能编辑的旧帖上补充日期与现行说明链接，同时让客服从同一份政策表答复。' },
      { question: '电商店铺另有售后承诺，怎样验证模型是否把它说成全渠道政策？', answer: '用相同型号分别问官网订单和指定店铺订单的质保，再问一次未指定渠道的情形。逐条检查回答有没有写明渠道、购买日期和出处，把仍然引用历史帖的例子留给售后负责人核对。' }
    ],
    en: [
      { question: 'What can a manufacturer do when Qwen cites an old support post after a warranty change?', answer: 'Verify the applicable terms by product, channel and order date. Publish the current duration, effective date, earlier terms and contact point on the warranty page. Add a dated link to the current terms on editable posts and give support staff the same policy table.' },
      { question: 'How can the team check whether store-specific terms are being applied to every order?', answer: 'Ask about the same model for a direct order, a particular marketplace store and an unspecified channel. Check whether each answer identifies the channel, purchase date and source. Save examples citing historical posts for the support owner to review.' }
    ]
  },
  'en-corpus': {
    review: {
      'zh-CN': {
        fact: '相似的中英文型号名可能属于不同市场版本，可用零件号核对。',
        rows: [
          ['型号对应', '零件号与适用市场', '两种语言指向同一配置'],
          ['数值换算', '工程单位、精度和原始值', '核对舍入后是否改变选型边界']
        ]
      },
      en: {
        fact: 'Similar model names in two languages may describe different market editions. The part number can resolve the match.',
        rows: [
          ['Model mapping', 'Part number and applicable market', 'Both languages describe one configuration'],
          ['Unit conversion', 'Engineering units, precision and original value', 'Check whether rounding changes the selection limit']
        ]
      }
    },
    records: { 'zh-CN': '每个在售型号保留一行双语对照，列出中文名、英文名、零件号、单位、市场版本和两份页面的修订日期。对于换算后的数值，请技术人员确认精度和取整方式。', en: 'For each active model, list its Chinese and English names, part number, units, market edition and both page revisions. Have engineering verify precision and rounding for converted values.' },
    'zh-CN': [
      { question: '英文官网与中文规格书的型号和参数对不上，先改哪里？', answer: '从仍在销售、采购最常问的型号开始。让技术负责人确认型号对应关系、单位、测试条件、适用市场和资料版本。用同一版批准材料更新两种语言的产品页，并在各页注明修订日期。' },
      { question: '英文旧页暂时改不完，怎么知道哪些仍在被引用？', answer: '用中文和英文分别询问同一型号的关键参数，记录来源 URL、页面语言、回答数值和版本。优先处理会影响选型的差异；对可编辑的历史页面加上归档标识和现行型号页链接。' }
    ],
    en: [
      { question: 'Where should an exporter start when its English site and Chinese spec sheets disagree?', answer: 'Start with current models that buyers ask about most. Have the technical owner verify model aliases, units, test conditions, applicable markets and revision. Update both language pages from the same approved sheet and date each revision.' },
      { question: 'How can a team find older English pages that still appear in answers?', answer: 'Ask for the same model specification in both languages. Record each source URL, page language, value and revision. Prioritize discrepancies that affect purchasing decisions. Mark editable historical pages as archived and link to the current model.' }
    ]
  },
  'mfg-growth': {
    review: {
      'zh-CN': {
        fact: '匿名案例仍可能通过产品图、特殊规格或项目时间被识别。',
        rows: [
          ['品牌归属', '自有型号清单与代工授权范围', '只将获准公开的自有型号列在品牌页'],
          ['案例发布', '客户批准稿及使用渠道', '核对截图、图注和附件中的标识']
        ]
      },
      en: {
        fact: 'An unnamed customer can still be identifiable from images, unusual specifications or project dates.',
        rows: [
          ['Brand ownership', 'Own-brand catalog and OEM permission scope', 'List only approved own-brand models on the brand page'],
          ['Case publication', 'Cleared draft and permitted channels', 'Check identifiers in images, captions and attachments']
        ]
      }
    },
    records: { 'zh-CN': '把拟公开描述、客户批准的具体版本、允许使用的平台和复核联系人放在同一份发布记录中。产品线或使用平台改变时，重新确认授权范围。', en: 'Keep the proposed text, customer-approved revision, permitted channels and reviewer in one publication record. Check the scope again when a product line or publishing channel changes.' },
    'zh-CN': [
      { question: '自有品牌和 OEM 代工业务怎样介绍，才能守住客户保密边界？', answer: '先列一张按产品线划分的发布清单。自有品牌只写已核准的型号和能力；代工业务只列获准公开的工艺、材质或产能口径。把客户名称、图纸、照片和可反推出客户身份的组合信息单列，得到相应授权后再使用。' },
      { question: '客户只同意匿名，案例页还能写哪些可核查的信息？', answer: '让客户审核拟公开的版本。可用获准的行业、问题范围、交付步骤和验收方法描述工作，注明匿名与时间范围。发布前检查图片标识、文件元数据和稀有参数组合，避免用私下表扬信充当公开背书。' }
    ],
    en: [
      { question: 'How can a manufacturer describe its own brand and OEM work while respecting customer confidentiality?', answer: 'Create a publication list for each product line. List approved models under the company brand. For OEM work, publish only cleared processes, materials or capacity statements. Review names, drawings, photos and combinations of details that might identify a customer before releasing them.' },
      { question: 'What can an anonymized case study still document?', answer: 'Have the customer review the actual draft. Use approved descriptions of the sector, problem, delivery steps and acceptance method. State the project period and anonymity. Inspect image labels, file metadata and unusual specifications that could identify the client. Private praise requires separate permission to quote publicly.' }
    ]
  },
  'fact-table': {
    review: {
      'zh-CN': {
        fact: '旧文件直链可以绕过下载目录，适用批次要在文件内也能查到。',
        rows: [
          ['现行版', '受控图纸及适用批次', '下载入口提供可辨认的最新版'],
          ['归档版', '历史 PDF 直链和修订号', '读者从旧链接也能找到换版说明']
        ]
      },
      en: {
        fact: 'A bookmarked PDF can bypass the download index. The applicable batch needs to be identifiable inside the file.',
        rows: [
          ['Current edition', 'Controlled drawing and applicable batch', 'Download entry identifies the current revision'],
          ['Archived edition', 'Historical PDF link and revision number', 'A reader opening the old link can find the revision notice']
        ]
      }
    },
    records: { 'zh-CN': '任选一个在售型号，分别从产品页和旧 PDF 直链查找同一项尺寸。写下两处的单位、图号与修订日期；若两版适用于不同批次，在对照表里分别注明。', en: 'Choose a current model and look up one dimension on the product page and through an old PDF link. Record the units, drawing number and revision date in each. If editions apply to different batches, label both.' },
    'zh-CN': [
      { question: '旧 PDF 产品手册还有客户在用，怎样区分现行参数和历史参数？', answer: '给每份手册标明版本、发布日期和适用型号。在下载页优先展示现行版，旧版归档供已购客户查阅。在仍可编辑的旧文件或下载入口标出替代版本，并为影响选型的尺寸、单位和测试条件建立网页参数表。' },
      { question: '只更新下载页够吗，怎样检查旧 PDF 直链？', answer: '从客户收藏的直链打开文件，检查封面、版本标识和新版入口。再用含具体型号、尺寸和单位的问题复测，记录模型实际引用的是网页、新文件还是旧直链；对仍有访问的旧版提供换版说明。' }
    ],
    en: [
      { question: 'How can buyers distinguish current specifications from older PDF manuals they still use?', answer: 'Mark each manual with its revision, publication date and applicable models. Feature the current edition in the download center and archive earlier editions for installed equipment. Label superseded files or download entries and publish dimensions, units and test conditions in a current web table.' },
      { question: 'How should the team check old direct PDF links after updating the download page?', answer: 'Open a bookmarked file URL directly. Check its cover, revision and route to the current edition. Repeat a buyer question that includes the model, dimension and unit. Record whether the answer cites the current page, new file or old direct URL. Add a revision notice wherever older copies remain accessible.' }
    ]
  },
  'audit-report': {
    review: {
      'zh-CN': {
        fact: '一个已完成的回答可以提及品牌而没有官网引用。采集失败须保留单独的状态。',
        rows: [
          ['品牌提及', '可检查的回答原文', '在该回答中按品牌计一次'],
          ['官网引用', '该轮来源面板中的官网 URL', '按含官网来源的有效回答数计']
        ]
      },
      en: {
        fact: 'A completed answer may name the brand without citing its site. Collection failures require a separate status.',
        rows: [
          ['Brand mention', 'Inspectable answer text', 'Count the brand once per answer'],
          ['Company-site citation', 'Company URL in that turn’s source panel', 'Count completed answers with a company source']
        ]
      }
    },
    records: { 'zh-CN': '把每一次回答作为一行，核对问句、轮次、模型、采集时间、品牌提及、官网来源和采集状态。一个回答引用同一官网三次，在“含官网引用的回答数”这一栏仍只计一条。', en: 'Use one row per answer with prompt, turn, model, capture time, brand mention, company-site source and collection status. An answer linking to the company site three times counts once toward the number of answers citing that site.' },
    'zh-CN': [
      { question: '服务商月报只有几张截图，怎样复核品牌提及和网页引用？', answer: '向服务商索取逐次查询明细，至少包括模型、问句、时间、对话上下文、回答摘录以及来源面板中可见的标题和 URL。分别标出提及品牌、引用官网、引用其他网站和没有可见来源的情况。用约定的同一组问句复测并保留全部结果。' },
      { question: '同一个问题问了两次，只出现一次官网链接，月报里该怎么算？', answer: '若两次都获得可检查的回答，官网引用记为 1/2。逐次记录是否提及品牌；第二次没有来源也要保留。若采集失败，应列出失败次数和原因，单独说明有效回答的分母。两次查询不足以推断长期概率。' }
    ],
    en: [
      { question: 'How can a buyer verify brand mentions and citations when a GEO report contains only screenshots?', answer: 'Request one row per query with the model, prompt, time, conversation context, answer excerpt and the titles and URLs visible in the source panel. Mark brand mentions, company-site citations, other sources and answers with no visible sources separately. Repeat the agreed questions and retain every result.' },
      { question: 'If only one of two runs cites the company site, how should the report count it?', answer: 'If both answers can be inspected, record one company-site citation in two answers (1/2). Track brand mentions separately and retain the answer without sources. List collection failures and explain the denominator of valid answers. Two observations cannot establish a long-term probability.' }
    ]
  },
  'reputation-fix': {
    review: {
      'zh-CN': {
        fact: '停产、停止备件供应和售后截止可以是不同日期。',
        rows: [
          ['现存设备', '旧型号、备件状态及支持范围', '历史页保留老客户的服务入口'],
          ['新购替代', '替代型号规格与安装条件', '注明兼容范围及需要再确认的配置']
        ]
      },
      en: {
        fact: 'End of sales, spare-part availability and end of support can have different dates.',
        rows: [
          ['Installed equipment', 'Old model, parts status and support scope', 'Historical page retains the service contact'],
          ['New replacement', 'Successor specifications and mounting conditions', 'Identify compatible setups and exceptions']
        ]
      }
    },
    records: { 'zh-CN': '让产品负责人核对旧型号、最后销售日期、支持截止日期、替代型号和差异清单。在产品页与下载页分别按旧型号查一次，检查两处指向的服务范围是否一致。', en: 'Have the product owner verify the old model, last sale date, support end date, replacement and differences. Look up the old model in the product catalog and download center and check whether both show the same support scope.' },
    'zh-CN': [
      { question: '停产型号仍被模型推荐，官网应该保留哪些信息？', answer: '保留一个能按旧型号找到的页面，标明停产日期、停止销售状态、备件与售后范围，并链接到经工程师确认的替代型号。将页面从在售分类移到历史型号目录，让老客户仍能查到支持信息。' },
      { question: '替代型号的参数有差异，如何防止被说成可以直接互换？', answer: '对照列出安装尺寸、电气接口、使用条件和需要改造的项目。请工程师注明能否直接更换以及哪些场景需要复核。分别用旧型号询价、备件查询和替换咨询复测，检查回答是否区分这三种需求。' }
    ],
    en: [
      { question: 'What should a website keep when an AI answer still recommends a discontinued model?', answer: 'Keep a searchable page for the old model. State its discontinuation date, sales status and available parts or support. Link to an engineer-approved replacement and move the listing into a historical catalog so existing customers can still find service information.' },
      { question: 'How can a supplier explain when a replacement is not a drop-in equivalent?', answer: 'Compare mounting dimensions, interfaces, operating conditions and required modifications. Have engineering identify configurations that need review before replacement. Test separate questions about new orders, spare parts and retrofits to see whether answers distinguish these needs.' }
    ]
  },
  'fde-kunshan': {
    review: {
      'zh-CN': {
        fact: '内容审核权、账号管理权与源文件所有权需分别核对。',
        rows: [
          ['发布权限', '账号角色、授权期限与审批人', '试发草稿后核对实际访问范围'],
          ['交接撤权', '文件所有者、共享链接和成员清单', '企业账号可编辑且临时访问已撤销']
        ]
      },
      en: {
        fact: 'Editorial approval, account administration and file ownership are separate controls.',
        rows: [
          ['Publishing access', 'Role, expiry and approver', 'Check actual permissions with a draft'],
          ['Handover', 'File owners, shared links and members', 'Company can edit and temporary access has ended']
        ]
      }
    },
    records: { 'zh-CN': '从一项工作倒推权限。例如，起草产品问答只需访问批准的资料与草稿区；由企业发布人复核并上线。交接记录应能追溯实际发布人、文件所有者和授权截止日。', en: 'Map each task to the access it requires. For example, a writer drafting product FAQs needs approved source files and a draft workspace. A company editor can review and publish. The handover record should identify the publisher, file owner and access expiry.' },
    'zh-CN': [
      { question: '请外部团队维护 GEO 内容，需要交出官网和公众号主账号吗？', answer: '让服务商列出每项交付所需的操作。资料审阅可提供已批准的文档，写稿可用草稿权限，正式发布可由企业人员完成。确需后台操作时按人分配限期账号，保留发布记录、审核人和撤权日期。' },
      { question: '合作结束时怎样验收源文件并收回权限？', answer: '逐项点收可编辑稿、引用来源清单、发布地址、版本记录和约定的授权文件。用企业自己的账号打开文件并验证能否修改；核对所有临时成员、共享链接和自动发布凭据，交接后逐一撤销并记录时间。' }
    ],
    en: [
      { question: 'Does an external GEO team need the master accounts for the website and social channels?', answer: 'Ask which actions each deliverable requires. Approved files can cover document review, draft access can cover writing, and a company editor can publish. Grant named, time-limited roles when platform access is necessary. Keep a record of releases, approvers and access expiry dates.' },
      { question: 'How should the company verify editable files and close access at handover?', answer: 'Collect the editable drafts, source inventory, published URLs, revision records and agreed permissions. Open and edit the files with a company account. Review temporary members, shared links and publishing credentials, revoke them after handover and record the date.' }
    ]
  }
};

export function getBuyerGuide(siteKey, lang) {
  const baseKey = lang === 'en' ? siteKey.replace(/-en$/, '') : siteKey;
  const guide = buyerQuestions[baseKey];
  if (!guide) return;
  const review = guide.review[lang];
  return {
    questions: guide[lang],
    records: guide.records[lang],
    facts: [review.fact],
    table: {
      title: lang === 'en' ? 'Review checklist' : '验收核对表',
      headers: lang === 'en' ? ['Item', 'Evidence', 'Acceptance check'] : ['核验项', '依据', '验收方法'],
      rows: review.rows
    }
  };
}
