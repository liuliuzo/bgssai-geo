// Editorial questions adapted from the Kunshan query collection of 20 November 2026.
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
  },
  'ks-pingce': {
    review: {
      'zh-CN': {
        fact: '付费诊断报告与正式报价须共用同一套提问词、采集时间和核验记录。',
        rows: [
          ['基线诊断', '提问原文、模型版本与采集时间', '逐条复查来源面板与零引用回答'],
          ['异地比价', '昆山驻场调研与苏州团队的交付分工', '报价单写明实际撰稿人与审稿流程']
        ]
      },
      en: {
        fact: 'A paid diagnostic report and a formal quote need to share the same prompts, capture times and verification records.',
        rows: [
          ['Baseline audit', 'Prompt text, model version and capture time', 'Check source panels and zero-citation runs'],
          ['Regional quotes', 'Kunshan onsite scoping and Suzhou team roles', 'Quote names the actual writers and review steps']
        ]
      }
    },
    records: { 'zh-CN': '请昆山与苏州候选团队针对同一条产品线各出一份基线诊断和报价，把提问清单、采集时间、来源链接、实际撰稿人及修改轮次并排核对后再签约。', en: 'Ask Kunshan and Suzhou candidates to diagnose and quote the same product line. Compare the prompt list, capture time, source links, assigned writers and revision rounds side by side before signing.' },
    'zh-CN': [
      { question: '签约前先做付费 GEO 诊断，报告里至少要有哪几项可复核记录？', answer: '合格的诊断报告不能只有零散截图，至少应列出测试的产品线、完整提问词、模型名称、联网状态、采集时间、回答摘录及来源面板中的标题和网址，并把零引用回答与采集失败单独标出，方便企业按原问法自行复查。' },
      { question: '同时对比昆山本地与苏州公司的 GEO 方案，除了总价还要对齐哪些口径？', answer: '要求两边按同一批采购问句、目标模型、更新频次和交付页面列明明细，确认技术稿由谁调研编写、是否转包、工程师审稿改稿包含几轮，以及合作期满后静态页面与原始台账是否归企业所有。' }
    ],
    en: [
      { question: 'What verifiable records belong in a paid pre-contract GEO diagnostic report?', answer: 'Beyond screenshots, require the product line, exact prompts, model names, search mode, capture timestamps, answer excerpts and the titles and URLs shown in each source panel. Keep zero-citation answers and failed runs labeled separately so the team can repeat the check.' },
      { question: 'When comparing Kunshan and Suzhou GEO proposals, what scope items need to match besides price?', answer: 'Align the buyer prompts, target models, refresh cadence and delivered pages. Confirm who interviews engineers and writes technical drafts, whether any work is subcontracted, how many review rounds are included, and whether editable pages and logs belong to the buyer at handover.' }
    ]
  },
  'sz-park': {
    review: {
      'zh-CN': {
        fact: '园区企业库与路牌门牌写法不同时，对外页面需同时保留标准注册地址与园区位置说明。',
        rows: [
          ['园区名录', '企业库旧产能与现行官网简介', '提交变更申请并注明核准日期'],
          ['地址表述', '园区楼宇名称与道路门牌号', '联系页与地图认领页使用同一写法']
        ]
      },
      en: {
        fact: 'When industrial park directories and street numbers differ, public pages should pair the registered street address with the park location.',
        rows: [
          ['Park directory', 'Legacy capacity entry and current company profile', 'Submit an update request and date the current profile'],
          ['Address format', 'Industrial park building name and street number', 'Use the same wording on contact and map pages']
        ]
      }
    },
    records: { 'zh-CN': '收集园区官网、行业协会年刊与招商手册中的本公司条目，逐条登记其中的产能、主营型号、联系人和门牌写法，标注已在官网更正的字段和等待园区审核的条目。', en: 'Collect entries in industrial park portals, association yearbooks and investment brochures. Log the listed capacity, main models, contacts and street address, and track which items are updated on the website or awaiting organizer revision.' },
    'zh-CN': [
      { question: '昆山园区名录和协会年刊里的旧简介一时改不了，怎样减少被模型误引？', answer: '先在官网企业介绍页发布注明更新日期的现行产能、主推型号和联系方式，说明历史年刊与招商资料仅反映报送当年情况；同时向园区和协会提交资料更新申请，保留提交记录并在下次复测时检查回答引用的出处。' },
      { question: '官网写园区名称而平时对外用道路门牌号，怎样防止被当成两家企业？', answer: '在官网页脚、联系我们、地图官方认领页和结构化实体档案中并列写出完整法定全称、道路门牌号与所在园区楼宇名称。用企业名加门牌号、企业名加园区名分别提问复测，检查回答是否指向同一主体。' }
    ],
    en: [
      { question: 'How can a factory reduce confusion when industrial park directories and association yearbooks still show outdated profiles?', answer: 'Publish a dated company profile on the official website with current capacity, active models and contact details, noting that earlier yearbooks reflect the submission year. File update requests with the park and association, keep the submission log and check which source future answers cite.' },
      { question: 'How should a manufacturer align its industrial park name with its street address so models do not treat them as two companies?', answer: 'Show the full legal name, street number and industrial park building together in the footer, contact page, verified map listing and Organization schema. Test queries using both the street address and the park name to confirm answers identify one entity.' }
    ]
  },
  'geo-baojia': {
    review: {
      'zh-CN': {
        fact: '历史活动价和流出的旧阶梯价缺少有效期与商务条件时，容易被当成现行统一报价。',
        rows: [
          ['历史推文', '旧活动价、赠品规则与发布日期', '保留产品讲解但在首段标明价格已失效'],
          ['经销价格', '未盖章网盘价表与现行商务条款', '官网说明询价入口与有效报价单条件']
        ]
      },
      en: {
        fact: 'Historical promotional prices and leaked tier sheets can be mistaken for current standard pricing when validity dates and terms are missing.',
        rows: [
          ['Past posts', 'Old promo price, bundle terms and post date', 'Keep technical notes and mark the price expired at the top'],
          ['Dealer sheets', 'Unsigned shared files and current quote rules', 'State official inquiry channels and valid quote conditions']
        ]
      }
    },
    records: { 'zh-CN': '盘点公众号旧推文、电商历史活动页和外部文库流传的报价表，记录其中出现的型号、价格、起订量与日期，在可编辑页面顶部补上失效提示并指向现行商务说明页。', en: 'Inventory historical social posts, past campaign pages and shared price tables. Record the models, figures, minimum order quantities and dates shown, then add an expiration notice on editable posts linking to the current commercial terms.' },
    'zh-CN': [
      { question: '公众号旧推文和网盘流出的历史价表还在被搜到，怎样避免模型报出过期价格？', answer: '在官网建立注明生效日期的现行计价与商务说明页，写明定制产品受规格、批次和交期影响，正式价格以盖章报价单为准；对仍需保留技术讲解的旧推文，在开头补充价格失效提示与现行说明链接。' },
      { question: '按批次定制的工业品不能在网页写死单价，如何防止模型自行编造工期和报价？', answer: '不要只留一句模糊的咨询客服，可在产品页列出影响价格和交期的具体变量，如材质、公差等级、表面处理、起订量区间与常规排产周期范围，再用采购询价问法复测回答是否按区间与前提条件表述。' }
    ],
    en: [
      { question: 'What can a supplier do when old social posts and shared price sheets cause AI answers to quote expired prices?', answer: 'Publish a dated commercial policy page stating how standard and custom orders are priced and confirming that formal stamped quotes govern. Where older posts remain useful for technical explanations, place an expiration notice and link to current terms at the top.' },
      { question: 'How should a custom manufacturer present lead times and pricing without publishing a fixed unit price?', answer: 'Instead of a vague contact-sales line, list the variables that determine price and lead time—material grade, tolerance class, finish, order batch range and typical scheduling windows—then test buyer price prompts to check whether answers include those conditions.' }
    ]
  },
  'yuanbao-geo': {
    review: {
      'zh-CN': {
        fact: '第三方拆机评测与历史直播回放对应的是拍摄当时的型号版本和活动配置。',
        rows: [
          ['历史视频', '评测或回放中的旧型号与旧配件组合', '可编辑简介与置顶说明补充现行规格入口'],
          ['官方信源', '官网与认证公众号的在售型号参数表', '网页与公众号同步发布带日期的现行版本']
        ]
      },
      en: {
        fact: 'Third-party teardown videos and livestream replays reflect the model revision and bundle offered on the recording date.',
        rows: [
          ['Legacy videos', 'Earlier model specs and retired bundles in replays', 'Add current spec links to editable descriptions and pinned notes'],
          ['Official sources', 'Active model tables on the website and verified social accounts', 'Publish dated current specs across web and official channels']
        ]
      }
    },
    records: { 'zh-CN': '按在售主力型号检索主流视频、直播回放、小红书笔记和公众号文章，记下仍在传播上一代参数或已停用配件包的条目，区分自有账号可改项与第三方发布项。', en: 'Search video platforms, livestream replays, community notes and official articles for each flagship model. List items that still show previous-generation specs or retired bundles, separating company-controlled posts from third-party uploads.' },
    'zh-CN': [
      { question: '早年达人评测视频和去年直播回放讲的是旧配置，元宝或豆包还会拿来介绍现行产品吗？', answer: '会存在引用历史视频标题、简介或关联文章的情况。建议在官网与企业认证公众号同步发布注明生效日期的在售型号参数表及代际差异对照；自有旧回放与旧笔记保留演示价值时，在标题或置顶简介标明配置已更新并附上现行页面链接。' },
      { question: '不删除有播放量的旧安装视频和笔记，怎样验证模型是否已改用现行规格？', answer: '用买家常问的型号参数、标配附件和购买方式在目标模型中复测，同时记录列出引用链接的回答与零引用回答。核对回答中的数值究竟来自官网现行表、公众号新文还是历史视频，针对仍被误引的字段补充更清晰的版本对照。' }
    ],
    en: [
      { question: 'Will Yuanbao or Doubao describe current products using older influencer reviews and last year’s livestream replays?', answer: 'Models can draw on titles, descriptions or articles tied to earlier videos. Publish dated specification tables and generation-to-generation change notes on both the official website and verified social accounts, and add an update notice with a current link to pinned descriptions on company-owned replays.' },
      { question: 'Without deleting popular installation videos or notes, how can a team check whether answers now use current specs?', answer: 'Run buyer prompts covering model parameters, standard accessories and ordering channels. Record both cited answers and zero-citation answers, check whether stated figures match the current spec table or older videos, and clarify any fields that still drift.' }
    ]
  },
  'crossborder-geo': {
    review: {
      'zh-CN': {
        fact: '跨境平台商铺与早年外文名录中的过期证书和旧英文名会干扰海外与国内模型识别。',
        rows: [
          ['商铺资质', '国际站与1688店铺悬挂的证书扫描件', '下架过期扫描件并写明现行证书编号与适用范围'],
          ['外文名录', '早年第三方海外目录中的旧英文名与联系人', '中英文官网同步声明标准英文全称与官方联系渠道']
        ]
      },
      en: {
        fact: 'Expired certificate scans on B2B storefronts and obsolete English names on overseas directories can misdirect both domestic and global models.',
        rows: [
          ['Storefront certs', 'Certificate scans on Alibaba and 1688 pages', 'Replace expired scans and state current certificate scope'],
          ['Foreign directories', 'Old English names and contacts on third-party listings', 'Publish the canonical English legal name and official contacts on bilingual sites']
        ]
      }
    },
    records: { 'zh-CN': '逐一核对中英文官网、阿里国际站、1688店铺及可查到的海外行业名录，对齐英文法定名称、在售型号、认证编号、覆盖产品范围与有效期，将待跨部门修改的商铺页面列入排期。', en: 'Audit the Chinese and English websites, Alibaba International, 1688 storefronts and reachable overseas directories. Align the English legal name, active models, certificate numbers, certified scope and expiry dates, and schedule updates with storefront owners.' },
    'zh-CN': [
      { question: '阿里国际站和1688店铺还挂着上一轮过期认证扫描件，做 GEO 前要先处理吗？', answer: '应当优先更新。模型不仅读取官网，也常检索头部 B2B 平台页面。需下架过期扫描件，改用文字和清晰图片同步列出现行有效证书的编号、发证机构、覆盖产品范围与截止日期；正在换证的资质如实注明换证状态，不混用旧证范围。' },
      { question: '早年海外供应商名录联系不上管理员修改旧英文名，中英文官网该怎样对齐？', answer: '在中英文官网的关于我们、页脚和 Organization 结构化数据中统一现行中英文法定名称、曾用外文写法、注册地址与官方邮箱域名，并注明未经更新的第三方目录仅供参考；随后分别用中英文名称复测跨语言回答是否一致。' }
    ],
    en: [
      { question: 'Should expired certificate scans on Alibaba International and 1688 storefronts be updated before starting GEO?', answer: 'Yes. Models regularly retrieve B2B marketplace profiles alongside company websites. Remove expired scans, publish current certificate numbers, issuing bodies, covered product scope and validity dates in plain text, and label renewals in progress accurately.' },
      { question: 'How can an exporter align its bilingual websites when old overseas directories cannot be edited?', answer: 'State the current Chinese and English legal names, historical English spellings, registered address and official email domain consistently across both sites and Organization schema, noting that unmaintained third-party directories are non-authoritative, then retest in both languages.' }
    ]
  },
  'ks-machinery': {
    review: {
      'zh-CN': {
        fact: '政府环评公示与历史公开标书反映的是特定审批或单次项目条件，不等于现行常规产能与交期。',
        rows: [
          ['环评与科技公示', '审批年份、公示产线与现行实际产能', '工厂合规页写明现行产线配置与核准日期'],
          ['历史招投标文件', '单次项目定制条款与常规供货标准', '产品与交付页区分定制标书与现行标准件口径']
        ]
      },
      en: {
        fact: 'Government environmental filings and historical public tender documents describe project-specific or approval-year conditions rather than current standard capacity and lead times.',
        rows: [
          ['Public filings', 'Filing year, approved lines and current plant capacity', 'Plant page states current equipment and effective date'],
          ['Historical tenders', 'Single-project bid terms and standard supply terms', 'Product page separates custom project bids from standard supply']
        ]
      }
    },
    records: { 'zh-CN': '收集公共平台上仍能检索到的环评验收、科技项目公示与中标技术文件，整理出与现行产能、工艺路线、配置清单和交货期不一致的条目，由生产与商务负责人确认现行公开口径。', en: 'Gather publicly searchable environmental filings, grant notices and tender specifications. List where capacity, process routes, configurations or lead times differ from current operations, and have production and commercial owners approve the current statement.' },
    'zh-CN': [
      { question: '政府网站上的旧环评公示和科技项目验收材料撤不掉，模型按旧产能介绍工厂怎么办？', answer: '政务公开文件按规定长期留存，无需也无法删除。应在官网工厂与合规页列明现行厂区面积、主力机台、工艺路线、有效认证与统计日期，并客观说明早期环评或科研立项公示反映立项当年方案，方便检索器比对时间先后。' },
      { question: '公开平台还能下载前几年的投标技术文件，怎样避免其中的单次配置和交期被当成常规标准？', answer: '在官网产品页与交付说明页写明现行标准配置、选配项和常规排产周期，并注明公开招投标资料仅适用于对应历史项目编号与合同批次。复测时询问常规配置和交期，检查回答是否区分项目定制与标准供货。' }
    ],
    en: [
      { question: 'What should a factory publish when unremovable government environmental or grant notices show outdated capacity?', answer: 'Public regulatory filings remain online permanently. Publish a dated plant and compliance page detailing current floor space, production equipment, processes and active certifications, explaining that earlier filings reflect the approval-year plan.' },
      { question: 'How can a manufacturer prevent historical public tender specs from being cited as current standard configurations and lead times?', answer: 'State current standard configurations, options and normal lead-time ranges on product and delivery pages, noting that public tender documents apply only to that specific historical project. Retest standard buyer prompts to verify the distinction.' }
    ]
  },
  'entity-anchor': {
    review: {
      'zh-CN': {
        fact: '流通包装二维码、旧域名镜像、停用热线与旧厂区地图钉都会影响联系与售后指路。',
        rows: [
          ['链接与旧域名', '包装铭牌二维码落地页与历史域名跳转', '旧地址301指向现行说明页或置顶归档跳转入口'],
          ['电话与网点', '工商年报旧号码及地图旧厂区和已撤维修点', '官网与官方地图认领页同步现行电话与在营网点']
        ]
      },
      en: {
        fact: 'Shipped packaging QR codes, legacy domains, retired hotlines and old map pins directly affect how buyers reach sales and service.',
        rows: [
          ['QR & old domains', 'Packaging QR landing URLs and legacy domain redirects', 'Redirect old URLs or place a top notice linking to the live page'],
          ['Phones & locations', 'Old numbers in filings and closed plant or repair pins', 'Sync active numbers and service sites on the website and verified maps']
        ]
      }
    },
    records: { 'zh-CN': '实际扫描库存包装与铭牌二维码、拨打各平台留存的联系电话、在主流地图搜索公司名与售后网点，逐项记录落地网址、号码状态和导航定位，建立待跳转链接和待申诉地点清单。', en: 'Scan QR codes on stocked packaging and nameplates, dial listed phone numbers and search major map apps for plant and repair locations. Log every landing URL, phone status and map pin to track redirects and map corrections.' },
    'zh-CN': [
      { question: '市场上流通的产品包装二维码还跳向几年前的旧页面，旧域名也还没关，该怎么处理？', answer: '优先把二维码对应的路径和旧域名配置服务端 301 跳转到现行产品与报修说明页；若老客户仍需查阅对应批次资料，可在现行页提供按批次归档入口，并在官网页脚与结构化数据中声明唯一主官网域名。' },
      { question: '客服热线换过号、厂区搬迁或撤过维修点，怎样核查模型是否还在报空号和旧地址？', answer: '先在官网联系页、售后网点表、公众号菜单及百度高德官方认领页只保留在用电话与在营网点，写明原号码和旧厂址已停用及启用新址日期；再用怎么联系售后、去哪看厂或维修等问法逐模型复测并核对引用来源。' }
    ],
    en: [
      { question: 'How should a manufacturer handle shipped packaging QR codes and legacy domains that still open outdated pages?', answer: 'Configure server-side 301 redirects from legacy QR paths and old domains to the live product and support hub. Provide batch-specific archive links on the live page for existing users, and declare the single canonical domain in the footer and schema.' },
      { question: 'After changing hotlines, relocating a plant or closing repair outlets, how can the team verify models stop giving dead numbers and old addresses?', answer: 'Update the contact page, active service-center directory, social menus and verified map listings with current numbers and addresses, noting retired numbers and relocation dates. Retest support and visit prompts across models and inspect cited sources.' }
    ]
  },
  'vendor-due': {
    review: {
      'zh-CN': {
        fact: '工商登记经营范围涵盖法定备选大类，实际在营产线与有效认证需以现行资质表核对。',
        rows: [
          ['经营范围', '年报法定登记大类与当前实际在营产品线', '官网业务页列明在售品类并说明已停业务状态'],
          ['检测与荣誉', '转载站过期型式试验报告、区级奖项与客户旧审厂表', '资质页只列有效期内证书并注明标准号与起止日']
        ]
      },
      en: {
        fact: 'Statutory business registration categories are broad; active product lines and valid certifications must be checked against a dated qualification schedule.',
        rows: [
          ['Business scope', 'Broad statutory registration vs active product lines', 'Business page lists active lines and notes discontinued work'],
          ['Tests & awards', 'Reposted expired test reports, past awards and old audit sheets', 'Qualification page lists valid certificates with standard numbers and dates']
        ]
      }
    },
    records: { 'zh-CN': '对照企查查等工商信息页、第三方资料站转载的检测报告、政府历年获奖公告及客户招标附件中的旧审厂表，核查每项资质的标准版次与有效期，整理出官网在营业务与有效认证清单。', en: 'Compare corporate registry profiles, reposted test reports, historical award notices and old customer supplier-audit attachments. Check the standard edition and expiry date of every credential to compile the official active-business and valid-certificate list.' },
    'zh-CN': [
      { question: '工商年报经营范围写得很宽、含早已不做的业务，模型会据此误判企业主营吗？', answer: '公开工商数据常被检索引用。无需匆忙变更营业执照，可在官网关于我们与产品中心明确列出当前实际研发、生产和交付的产品线，注明营业执照经营范围为法定登记大类、未列入在售目录的早期业务已不再承接。' },
      { question: '下载站转载的过期型式试验报告、早年奖项和客户公开的旧审厂表撤不掉，官网资质页怎么写？', answer: '在官网资质与体系页按文字表格公布现行有效证书的名称、现行标准号、覆盖范围和起止日期，把历史荣誉单独归入已到期栏目并标明获奖年份，同时声明第三方转载的过期检测报告与历史审厂附件不作为现行供货依据。' }
    ],
    en: [
      { question: 'Will AI models misstate a factory’s core business when corporate registry filings list broad or discontinued activities?', answer: 'Public registry records are frequently indexed. Without rushing to amend the business license, list currently manufactured and supported product lines clearly on the website, noting that statutory registration categories do not mean discontinued lines remain active.' },
      { question: 'How should the qualification page handle unremovable expired test reports, past awards and old customer audit attachments online?', answer: 'Publish a text table of active certificates with current standard numbers, covered scope and validity dates. Place historical awards in a dated archive section and state that expired third-party test reposts and historical audit sheets do not represent current qualification.' }
    ]
  },
  'bilingual-brand': {
    review: {
      'zh-CN': {
        fact: '企业更名、同主体双品牌与外部项目合作报道若缺少主体对照，容易造成张冠李戴。',
        rows: [
          ['名称沿革', '专利软著与旧公告中的曾用名及现用法定全称', '品牌沿革页列明更名日期、统一社会信用代码与对应关系'],
          ['主体与品牌边界', '同主体双品牌分工及与外部合作集团的独立股权关系', '官网写明各品牌归属产品线与独立法人地位']
        ]
      },
      en: {
        fact: 'Company renamings, dual brands under one entity and partner press mentions require an explicit entity mapping to prevent conflation.',
        rows: [
          ['Name history', 'Former names on patents and tenders vs current legal name', 'Lineage section states rename date, registration code and mapping'],
          ['Entity boundaries', 'Dual-brand product split and independent ownership from partners', 'About page clarifies brand lines and independent legal status']
        ]
      }
    },
    records: { 'zh-CN': '汇总企业更名核准文件、带曾用名的专利软著清单、同主体下各品牌对应的型号表，以及将项目合作误写为母子公司关系的外部报道链接，逐一核对官网说明页的法务与工商表述。', en: 'Compile rename registration records, patents or copyrights bearing former names, model lists for each brand under the entity, and press links that misstate partner ownership. Verify the website entity statement against official registration records.' },
    'zh-CN': [
      { question: '公司改过名称或品牌名，但专利证书、老论坛和历史中标公告还是旧名字，怎么让模型认出是同一家？', answer: '在官网关于我们与产品说明页设立名称沿革说明，写明现用法定全称、曾用名、工商变更日期及统一社会信用代码不变的事实，并在相关产品页注明早期专利和软著登记时使用的原名称，随后分别搜新旧名称复测回答。' },
      { question: '同一公司运营两个品牌，或曾被外部报道误写成某集团子公司，官网该如何划清边界？', answer: '在官网建立品牌与产品线对照表，列明两个品牌各自覆盖的品类、适用客户与售后入口；针对外部失实从属报道，在企业主体档案中明确声明独立法人资格与真实股权结构，说明与合作方仅为项目业务往来、无隶属关系。' }
    ],
    en: [
      { question: 'After a company or brand rename, how can models connect the current name with former names still shown on patents and tender notices?', answer: 'Add a brand lineage note on the About and product pages stating the current legal name, former names, registration change date and unchanged corporate registration code, and note legacy names on older patents before testing prompts for both names.' },
      { question: 'How should a website clarify two brands under one company or correct press articles that call it a subsidiary of a project partner?', answer: 'Publish a brand-to-product mapping table showing each brand’s product lines, target buyers and support contacts, and state independent legal-entity ownership in the corporate profile to clarify that past partner work involved no equity affiliation.' }
    ]
  },
  'geo-platform': {
    review: {
      'zh-CN': {
        fact: '过期经销授权书、夸大区域独家的代理页面与二手平台在产描述均需对照原厂现行渠道核实。',
        rows: [
          ['授权渠道', '现行有效经销商名单、授权区域与截止日期', '官网公布查询方式并说明超期或未列名机构无代理权'],
          ['在产与正品核验', '二手平台挂售的停产旧机与现行在产型号表', '销售页列明正品采购通道、在产型号及发票质保规则']
        ]
      },
      en: {
        fact: 'Expired dealer letters, overstated exclusivity claims and secondhand listings claiming factory production must be checked against the manufacturer’s active channel roster.',
        rows: [
          ['Authorized dealers', 'Active distributor list, territory and expiry date', 'Publish verification contacts and note unlisted or expired claims'],
          ['Active models', 'Secondhand listings of retired units vs current production list', 'Sales page states official channels, active models and warranty terms']
        ]
      }
    },
    records: { 'zh-CN': '由销售管理部门核对现行有效经销商合同、授权区域和起止日期，收集外部仍挂着过期授权函、自称区域独家或二手平台标称原厂在产的页面截图与链接，纳入周期监测词库复查。', en: 'Have sales operations verify active distributor contracts, territories and expiry dates, and log external pages showing expired letters, unauthorized exclusivity claims or secondhand listings claiming current factory production for repeat monitoring.' },
    'zh-CN': [
      { question: '已终止合作或授权到期的经销商网站还挂着旧授权牌，甚至自称区域独家，原厂怎么澄清？', answer: '在官网授权渠道页公布现行合作经销商名单或官方核验方式，写明授权区域与有效期限，声明未列入现行名录或超出有效期的第三方页面不代表原厂现行授权；不便逐一点名时，用正面清单和统一核验热线供采购方求证。' },
      { question: '闲鱼和二手设备群把早年停产机型写成原厂在产可开票，怎样防止模型按二手信息指路？', answer: '在官网销售与服务政策页列明官方直营与授权购买通道、现行在产型号清单、已停产型号目录及原厂开票质保条件，明确二手流转设备不适用新车质保承诺；再用哪里能买到及在售型号等问法定期采集核对。' }
    ],
    en: [
      { question: 'How can a manufacturer clarify its channels when former dealers still display expired authorizations or claim regional exclusivity?', answer: 'Publish current authorized distributors or an official verification contact on the channel page with territories and validity periods, stating that unlisted or expired third-party pages do not represent active authorization.' },
      { question: 'What prevents AI answers from repeating secondhand marketplace posts that label discontinued machines as factory-new with invoice?', answer: 'Publish official purchasing channels, the active production model list, the discontinued catalog and original-invoice warranty rules on the sales policy page, noting that resold used units carry separate terms, then monitor buyer where-to-buy prompts.' }
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
